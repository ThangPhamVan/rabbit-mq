import { Injectable } from "@nestjs/common";
import { env } from "./adapter/rabbitmq-config";

@Injectable()
export class AppService {
  getHello(): string {
    // return 'Hello World!';
    return env("BASE_URL");
  }
}
