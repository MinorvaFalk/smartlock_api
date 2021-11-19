const mqtt = require('mqtt');
const options = {
    host: '54d8ff23e4294bcc971994bb72f83839.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'smartlock',
    password: 'Smartlock_pervasive2021'
}
const client = mqtt.connect(options)

module.exports = {client};