const express = require("express");
const bodyParser = require('body-parser');
const sendToQueue = require("./rabbitmq");
require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Server-1 is up and running...");
})

app.post("/order", (req, res) => {
    const { name, product, email } = req.body;
    const orderData = { name, product, email };
    sendToQueue(process.env.ORDERQUEUE, orderData);
    res.send("Order placed successfully....");
});


app.get("/orderStatus", (req, res) => {
    const orderId = req.query;
    const orderData = { orderId };
    sendToQueue(process.env.ORDERSTATUSQUEUE, orderData);
    res.send("Order status shared via email...");
})


app.listen(process.env.PORT, () => {
    console.log(`Server-1 is running on port ${process.env.PORT}...`);
})