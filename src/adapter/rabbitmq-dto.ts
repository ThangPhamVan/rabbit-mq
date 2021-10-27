import {env} from "./rabbitmq-config";
import {RabbitmqEvent} from "./rabbitmq-events";

export const RabbitmqMessageDto = {
    name: env("SERVICE_NAME"),
    event: RabbitmqEvent.UNKNOW,
    token: "40T0IWY03TwvzoUKaotz",
    data: {
        work_id: 0
    },
    action: RabbitmqEvent.CREATED,
    message: "additional message.",
    optional: {}
}

export const RabbitmqErrorDto = {
    name: "",
    code: 0,
    message: "unknown"
}
