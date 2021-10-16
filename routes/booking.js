const express = require('express')
const router = express.Router()

const { 
    getAllBooking,
    getSpecificBooking,
    createNewBooking
} = require('../controllers/booking')

const jwtHandler = require('../middleware/jwtHandler')
router.use(jwtHandler)

// Get All Booking
router.get('/', createNewBooking)

// Get Specific Booking ID
router.get('/:id', getSpecificBooking)



module.exports = router