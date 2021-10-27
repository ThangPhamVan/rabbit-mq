import {plainToClass} from "class-transformer";
import {RabbitmqMessageDto} from "./rabbitmq-dto";

export class RabbitmqPart {
    work_id: number = 0;
}

export class RabbitmqMessage {
    name: string;// info : env("SERVICE_NAME")
    event: string;// info : see event as CRUD
    status_code: number = 400;// info :
    token: string;// info :
    // data: RabbitmqPart = new RabbitmqPart();// info : see class above
    data: any = {
        work_id: 0
    };
    action: number;// info :
    message: string;// info : more message
    optional: any = {};// info : optional data
    public static NewInstance() {
        let output = plainToClass(RabbitmqMessage, RabbitmqMessageDto);
        return output;
    }

}
