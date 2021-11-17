const express = require('express')

const app = express()
const port = 3000

const users = require('./routes/users')
const auth = require('./routes/auth')
const booking = require('./routes/booking')
const rooms = require('./routes/room')
const nodes = require('./routes/node')

const logger = require('./middleware/logger')

app.use(express.static('./static'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

require('./mongo-connect');

app.use(logger)
app.use('/api/users/', users)
app.use('/api/auth/', auth)
app.use('/api/bookings/', booking)
app.use('/api/rooms', rooms)
app.use('/api/nodes', nodes)

app.get('/health', (req, res) => {
  res.status(200).json({status: "UP"})
})

app.get('*', (req, res) => {
  res.status(404).send('Routes not found')
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})