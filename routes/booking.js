const express = require('express')
const router = express.Router()
const adminHandler = require('../middleware/adminHandler')
const currentUserHandler = require('../middleware/currentUserHandler')
const { bookingRequest } = require('../requests/bookingRequest')
const { validate } = require('../helpers/validate');

const { 
    getAllBooking,
    getSpecificBooking,
    createNewBooking,
    editBooking,
    editStatusBooking,
    checkAvailability,
    deleteSpecificBooking,
    getAllUserBooking
} = require('../controllers/booking')

const jwtHandler = require('../middleware/jwtHandler')
router.use(jwtHandler)

// Get All Booking
router.get('/',  getAllBooking)

// Get All User Booking
router.get('/user/:nim', getAllUserBooking);

// Post Booking
router.post('/', bookingRequest(), validate, createNewBooking)

// Check room availability
router.get('/checkRoom', checkAvailability);

// Get Specific Booking ID
router.get('/:id', getSpecificBooking)

// Edit Specific Booking ID
router.put('/:id', editBooking)

// Approve/Edit Booking
router.patch('/:id', adminHandler, editStatusBooking)

// Delete specific Booking ID
router.delete('/:id', deleteSpecificBooking)

module.exports = router