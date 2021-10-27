import {RabbitmqMessage} from "./rabbitmq-message";
import {env} from "./rabbitmq-config";
import {RabbitmqEvent} from "./rabbitmq-events";
import {plainToClass} from "class-transformer";
import {HashTable, RabbitmqCollector} from "./rabbitmq-collector";

const AMQP_QUEUE_NAME = env("AMQP_QUEUE_NAME");
const SERVICE_NAME = env("SERVICE_NAME");

export abstract class RabbitmqBase {

    public channel: any;
    public connection: any;
    public host: string;
    public myself: string;
    public collectors: HashTable<RabbitmqCollector> = {}

    // info :
    protected consumeConfig() {
        return {noAck: false};
    }

    protected assertQueueConfig() {
        return {durable: true, exclusive: true};
    }

    public constructor(myself: string) {
        this.myself = myself;
    }

    public On(event: string, callback: Function) {
        let collector: RabbitmqCollector = new RabbitmqCollector();
        collector.name = this.myself.toUpperCase() + "_" + event;
        collector.callback = callback;
        this.collectors[event] = collector;
    }

    public Call(event: string, json: RabbitmqMessage): RabbitmqMessage {
        try {
            let me = this.myself.toUpperCase() + "_";
            if (this.collectors.hasOwnProperty(me + event)) {
                return this.collectors[event].callback(json);
            }
        } catch (ex: any) {

        }
        return new RabbitmqMessage();
    }

    public Send(message: RabbitmqMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                let sender: string = JSON.stringify(message);
                this.channel.sendToQueue(AMQP_QUEUE_NAME, Buffer.from(JSON.stringify(sender)));
                resolve(true);
            } catch (ex: any) {
                reject(false);
            }
        });

    }

    public async Kill() {
        this.channel.close();
        this.connection.close();
        this.Call(RabbitmqEvent.ON_TERMINATE, this.connection);
    }

    protected WhileData(msg: any) {
        try {
            let message: string = msg.content.toString();
            let receiver: RabbitmqMessage = plainToClass(RabbitmqMessage, JSON.parse(message));
            this.Call(RabbitmqEvent.ON_BROADCAST, receiver);
            if (receiver.name != SERVICE_NAME) {
                let response: RabbitmqMessage = this.Call(RabbitmqEvent.ON_DATA, receiver);
                response.name = SERVICE_NAME;
                response.action = RabbitmqEvent.HELLO;
                this.Send(response);
            } else {
                // info : do nothing
            }

        } catch (ex: any) {
            try {
                this.Call(RabbitmqEvent.ON_DATA_ERROR, ex);
            } catch (ex1: any) {

            }
        }
    }
}
