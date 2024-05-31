const express = require("express");
const amqplib = require('amqplib/callback_api');
const bodyParser = require('body-parser')
const queues = ['notifyEmail', 'notifyOrderStatus'];
const port = 3001;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Server-2 is up and running...");
})

amqplib.connect('amqp://localhost', (err, conn) => {
    if (err) throw err;
    // Listener
    conn.createChannel((err, channel) => {
        if (err) throw err;
        for (const queue of queues) {
            channel.assertQueue(queue, { durable: true });
        }
        queues.forEach(queue => {
            channel.consume(queue, message => {
                if (message !== null) {
                    console.log(`Received message from  ${queue} : ${message.content.toString()}`);
                    /* TODO call your own function to further task */
                    channel.ack(message); // Acknowledge the message
                }
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server-2 is running on port ${port}...`);
})