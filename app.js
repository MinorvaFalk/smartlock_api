const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000;

const users = require('./routes/users')
const auth = require('./routes/auth')
const booking = require('./routes/booking')
const rooms = require('./routes/room')
const nodes = require('./routes/node')
const admin = require('./routes/admin')

const logger = require('./middleware/logger')

app.use(express.static('./static'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({credentials: true}));
app.use(morgan('tiny'))

require('./mongo-connect');
const {client} = require('./mqttHandler')

app.use(logger)
app.use('/api/users/', users)
app.use('/api/auth/', auth)
app.use('/api/bookings/', booking)
app.use('/api/rooms', rooms)
app.use('/api/nodes', nodes)
app.use('/api/admin', admin)

app.get('/health', (req, res) => {
  res.status(200).json({status: "UP"})
})

app.get('*', (req, res) => {
  res.status(404).send('Routes not found')
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})

client.on('connect', function () {
  console.log('Connected');
});

client.on('error', function (error) {
  console.log(error);
});

client.on('message', function (topic, message) {
  //Called each time a message is received
  console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('node/check');

// // publish message 'Hello' to topic 'my/test/topic'
// client.publish('my/test/topic', 'Hello');