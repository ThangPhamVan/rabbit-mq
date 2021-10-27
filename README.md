## Need

```bash
# yarn installation
$ yarn add amqplib
$ yarn add axios

# npm installation
$ npm install amqplib
$ npm install axios

```

## Reference

A library for making AMQP 0-9-1 clients for Node.JS, and an AMQP 0-9-1 client for Node.JS v10+.
[read more here](https://www.npmjs.com/package/amqplib).

## Use as Server

```bash
# start server
await RabbitmqServer.getInstance().Start("amqp://localhost");
```

## User as Client

```bash
# start connection
await RabbitmqClient.getInstance().Start("amqp://localhost");

# watch mode


# production mode
$ 
```

## User as Client

```bash
# create connection
let connection = await RabbitmqClient.getInstance().Start("amqp://localhost");

# add callback

var my_callback = (data: object) : void => {
    # 'data' is string from server
    alert(data.toString());
}

connection.add_listener(my_callback);


# production mode
$ 
```
