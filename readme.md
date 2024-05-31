# Rabbitmq with node/expressjs

### In this code I have implemented the mutliple queue publice/consume the notification

## Prerequisites

1. Install rabbitmq in local macnine

## Project setup

For rabbitmq demo I have created 2 micro service like service-1 and service-2
service-1: publishes notification
service-2: consume those notification

```base
# cd service-1
# npm i
# npm run start
```

```base
# cd service-2
# npm i
# npm run start
```

Submit Order API :

```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "jojo",
    "product": "Iphone",
    "email": "test@yopmail.com"
}'
```

orderStatus API :

```bash
curl --location --request GET 'http://localhost:3000/orderStatus?id=123456' \
--header 'Content-Type: application/json' \
```

This api will push the notication to service-2 will see this message in console
