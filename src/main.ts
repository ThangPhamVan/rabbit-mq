import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RabbitmqExample } from "./adapter/rabbitmq-example";
import { env_int } from "./adapter/rabbitmq-config";


async function bootstrap() {

  // let example: RabbitmqExample = new RabbitmqExample();
  // await example.execute();
  const app = await NestFactory.create(AppModule);
  await app.listen(env_int("HTTP_PORT"));
}

bootstrap();
