const express = require('express')
const router = express.Router()
const adminHandler = require('../middleware/adminHandler')

const { 
    checkBooking, 
    createRoom, 
    getAllRooms
} = require('../controllers/room')

router.post('/check', checkBooking)

router.post('/create', adminHandler, createRoom)

router.get('/', adminHandler, getAllRooms)

module.exports = router