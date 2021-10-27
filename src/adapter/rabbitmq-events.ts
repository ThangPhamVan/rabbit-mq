export abstract class RabbitmqEvent {
    // info : Server and Client
    public static readonly ON_CONNECTED: string = "OnConnected";
    public static readonly ON_CONNECTED_ERROR: string = "OnConnectedError";
    public static readonly ON_CREATE_CHANNEL: string = "OnCreateChannel";
    public static readonly ON_CREATE_CHANNEL_ERROR: string = "OnCreateChannelError";
    public static readonly ON_DATA: string = "OnData";
    public static readonly ON_DATA_ERROR: string = "OnDataError";
    public static readonly ON_BROADCAST: string = "OnBroadcast";
    public static readonly ON_TERMINATE: string = "OnTerminate";
    // info : event as CRUD
    public static readonly CREATE: number = 0;//"SERVICE_UPDATE";
    public static readonly CREATED: number = 0.1;
    public static readonly READ: number = 10;//"SERVICE_READ";
    public static readonly UPDATE: number = 20;//"SERVICE_UPDATE";
    public static readonly UPDATED: number = 21;//"SERVICE_UPDATE";
    public static readonly DELETE: number = 30;//"SERVICE_DELETE";
    public static readonly UNKNOW: number = 90;
    public static readonly HELLO: number = 99;
    //

    public static readonly ON_RECONNECT: string = "OnReconnect";
    public static readonly ON_DISCONNECTED: string = "OnDisconnected";
    //
    public static readonly RPC_CLIENT_CONNECTED: string = "rpc_client_connected";
    public static readonly RPC_SERVER_CONNECTED: string = "rpc_server_connected";
    public static readonly PUB_CONNECTED: string = "pub_connected";
    //
    public static readonly SAVE_ENVIRONMENT_EVENT: string = "EnvironmentSaveEvent";
    public static readonly DELETE_ENVIRONMENT_EVENT: string = "EnvironmentDeleteEvent";
    public static readonly UPDATE_APPLICATION_EVENT: string = "ApplicationUpdateEvent";
    public static readonly SYNC_LOG_EVENT: string = "LogSyncEvent";
    public static readonly SEND_NOTIFICATION_EVENT: string = "SendNotificationEvent";
    public static readonly SAVE_LOG_EVENT: string = "SaveLogEvent";
    public static readonly DISCONNECTED: string = "disconnected";
    //
    public static readonly TRYING: string = "trying";
    public static readonly REESTABLISHED: string = "reestablished";
    public static readonly ERROR: string = "_error";
    public static readonly SUB_CONNECTED: string = "sub_connected";
    // info : RPC stand for Remote Procedure Call
    public static readonly RPC_CLIENT_DISCONNECTED: string = "rpc_client_disconnected";
    public static readonly RPC_CLIENT_TRYING_CONNECTION: string = "rpc_client_trying_connection";
    public static readonly RPC_CLIENT_RECONNECTED: string = "rpc_client_reconnected";
    public static readonly RPC_CLIENT_CONNECTION_ERROR: string = "rpc_client_connection_error";
    public static readonly RPC_SERVER_TRYING_CONNECTION: string = "rpc_server_trying_connection";
    public static readonly RPC_SERVER_RECONNECTED: string = "rpc_server_reconnected";
    public static readonly RPC_SERVER_CONNECTION_ERROR: string = "rpc_server_connection_error";

    public static readonly PUB_TRYING_CONNECTION: string = "pub_trying_connection";
    public static readonly PUB_RECONNECTED: string = "pub_reconnected";
    public static readonly PUB_CONNECTION_ERROR: string = "pub_connection_error";
    public static readonly SUB_TRYING_CONNECTION: string = "sub_trying_connection";
    public static readonly SUB_RECONNECTED: string = "sub_reconnected";
    public static readonly SUB_CONNECTION_ERROR: string = "sub_connection_error";
}
