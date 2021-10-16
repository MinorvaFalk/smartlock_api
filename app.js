const express = require('express')

const app = express()
const port = 3000

const users = require('./routes/users')
const auth = require('./routes/auth')
const booking = require('./routes/booking')

const logger = require('./middleware/logger')


app.use(express.static('./static'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

require('./mongo-connect');

app.use(logger)
app.use('/api/users/', users)
app.use('/api/auth/', auth)
app.use('/api/bookings/', booking)


app.get('/', async (req, res) => {
  res.send('API online')
})

app.get('*', (req, res) => {
  res.send('Routes not found')
})

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})