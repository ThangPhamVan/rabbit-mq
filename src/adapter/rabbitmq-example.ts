import {RabbitmqMessage} from "./rabbitmq-message";
import {RabbitmqClient} from "./rabbitmq-client";
import {env} from "./rabbitmq-config";
import {RabbitmqEvent} from "./rabbitmq-events";

export class RabbitmqExample {
    private api_name: string;

    on_connected(message: RabbitmqMessage): RabbitmqMessage {
        let output: RabbitmqMessage = new RabbitmqMessage();
        output.name = this.api_name;
        return output;
    }

    on_data(message: RabbitmqMessage): RabbitmqMessage {
        let output: RabbitmqMessage = new RabbitmqMessage();
        output.name = this.api_name;
        return output;
    }

    async execute() {
        this.api_name = "client";
        let host: string = env("AMQP_HOST");
        let client: RabbitmqClient = RabbitmqClient.getInstance();
        client.On(RabbitmqEvent.ON_CONNECTED, this.on_connected);
        client.On(RabbitmqEvent.ON_DATA, this.on_data);
        await client.Start(host);// start connection
        let sender: RabbitmqMessage = RabbitmqMessage.NewInstance();
        sender.name = env("SERVICE_NAME");
        sender.message = "message from client";
        client.Send(sender);
    }
}
