const { client } = require('./mqttHandler')
const { Node } = require('./models');
const cron = require('node-cron');

client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

cron.schedule('*/2 * * * *', async () => {
    let node = await Node.update({ status: 'Not Active' },{where: {}})
    client.publish('node/check', 'hourly node check');
    console.log('node-run')

})
client.on('message', function (topic, message) {
    //Called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('node/check');
