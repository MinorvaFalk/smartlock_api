require('dotenv').config();

const mqtt = require('mqtt');
const options = {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT,
    protocol: process.env.MQTT_PROTOCOL,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
}
const client = mqtt.connect(options)

module.exports = {client};