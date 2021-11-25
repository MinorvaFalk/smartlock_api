const express = require('express')
const router = express.Router()

const { bookingData } = require('../controllers/admin');
const adminHandler = require('../middleware/adminHandler')

router.use(adminHandler);

router.get('/data', bookingData)

module.exports = router