import {RabbitmqBase} from "./rabbitmq-base";
import {env} from "./rabbitmq-config";
import {RabbitmqEvent} from "./rabbitmq-events";

const amqp = require("amqplib/callback_api");
const AMQP_QUEUE_NAME = env("AMQP_QUEUE_NAME");
const SERVICE_NAME = env("SERVICE_NAME");

export class RabbitmqServer extends RabbitmqBase {
    private static instance: RabbitmqServer = null;

    public constructor() {
        super("Server");
    }

    public static getInstance(): RabbitmqServer {
        if (RabbitmqServer.instance == null) {
            RabbitmqServer.instance = new RabbitmqServer();
        }
        return RabbitmqServer.instance;
    }

    public async Start(host: string) {
        this.host = host;
        this.connection = await this.CreateConnection(host);
        this.channel = await this.CreateChannel(this.connection);
        this.channel.consume(AMQP_QUEUE_NAME, this.WhileData, this.consumeConfig());
    }

    private CreateConnection(server: string): Promise<any> {
        let self = this;
        return new Promise<any>((resolve, reject) => {
            amqp.connect(server, (error, conn) => {
                if (error) {
                    self.Call(RabbitmqEvent.ON_CONNECTED_ERROR, error);
                    reject(error);
                } else {
                    self.Call(RabbitmqEvent.ON_CONNECTED, conn);
                    resolve(conn);
                }
            });
        });
    }

    private CreateChannel(conn: any): Promise<any> {
        let self = this;
        return new Promise((resolve, reject) => {
            conn.createChannel((error, channel) => {
                if (error) {
                    self.Call(RabbitmqEvent.ON_CREATE_CHANNEL_ERROR, error);
                    reject(error);
                } else {
                    self.Call(RabbitmqEvent.ON_CREATE_CHANNEL, channel);
                    // channel.assertQueue(AMQP_QUEUE_NAME, {durable: false});
                    channel.assertQueue(AMQP_QUEUE_NAME, self.assertQueueConfig());
                    resolve(channel);
                }
            });
        });
    }

}

