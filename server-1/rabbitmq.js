const connect = require("./reabittMqConnect");

const sendToQueue = async function (queueName, data) {
    try {
        const channel = await connect();
        channel.assertQueue(queueName);
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.error('Error connecting to RabbitMQ', error);
    }
}

module.exports = sendToQueue;