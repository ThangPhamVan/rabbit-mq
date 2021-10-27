import {env} from "./rabbitmq-config";
import {RabbitmqBase} from "./rabbitmq-base";
import {RabbitmqEvent} from "./rabbitmq-events";

const amqp = require("amqplib/callback_api");
const AMQP_QUEUE_NAME = env("AMQP_QUEUE_NAME");
const SERVICE_NAME = env("SERVICE_NAME");

export class RabbitmqClient extends RabbitmqBase {

    private static instance: RabbitmqClient;

    private constructor() {
        super("Client");
    }

    public static getInstance() {
        if (RabbitmqClient.instance == null) {
            RabbitmqClient.instance = new RabbitmqClient();
        }
        return RabbitmqClient.instance;
    }

    public async Start(host: string) {
        this.connection = await this.CreateConnection(host);
        this.channel = await this.CreateChannel(this.connection);
        this.channel.consume(AMQP_QUEUE_NAME, this.WhileData, this.consumeConfig());
    }

    private async CreateChannel(connection: any): Promise<any> {
        let self = this;
        return new Promise((resolve, reject) => {
            connection.createChannel(function (error, channel) {
                if (error) {
                    self.Call(RabbitmqEvent.ON_CREATE_CHANNEL_ERROR, error);
                    reject(error);
                } else {
                    self.Call(RabbitmqEvent.ON_CREATE_CHANNEL, channel);
                    channel.assertQueue("", self.assertQueueConfig());
                    resolve(channel);
                }
            });
        });
    }

    private CreateConnection(host: string): Promise<any> {
        let self = this;
        return new Promise<any>((resolve, reject) => {
            amqp.connect(host, function (error, connection) {
                if (error) {
                    self.Call(RabbitmqEvent.ON_CONNECTED_ERROR, error);
                    reject(error);
                } else {
                    self.Call(RabbitmqEvent.ON_CONNECTED, connection);
                    resolve(connection);
                }
            });
        });
    }
}
