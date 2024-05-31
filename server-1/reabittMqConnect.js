const amqplib = require('amqplib');

const connect = async function () {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
    }
}

module.exports = connect;