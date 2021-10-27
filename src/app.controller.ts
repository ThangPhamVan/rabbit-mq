import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { RabbitmqClient } from "./adapter/rabbitmq-client";
import { RabbitmqMessage } from "./adapter/rabbitmq-message";
import { RabbitmqServer } from "./adapter/rabbitmq-server";
import { env } from "./adapter/rabbitmq-config";
import { RabbitmqEvent } from "./adapter/rabbitmq-events";

const server = RabbitmqServer.getInstance();
const client = RabbitmqClient.getInstance();


@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {
  }

  @Get("/server")
  public async Server() {

    return await server.Start(env("AMQP_HOST"));
  }

  public on_data(income: RabbitmqMessage) {
    console.log("app.controllers.ts : on_data");
    income.message = "hello again";
    return income;
  }

  @Get()
  async getHello() {
    // ตัวนี้คือการทดสอบส่งข้อมูล
    client.On(RabbitmqEvent.ON_DATA, this.on_data);
    await client.Start(env("AMQP_HOST"))
    let message = new RabbitmqMessage();
    message.message = "hello from client";
    message.event = "create";
    message.name = "example";
    return await client.Send(message);
    // return this.appService.getHello();
  }
}
