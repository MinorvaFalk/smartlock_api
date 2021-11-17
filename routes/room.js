const express = require('express')
const router = express.Router()
const adminHandler = require('../middleware/adminHandler')
const jwtHandler = require('../middleware/jwtHandler')

const { 
    getSpecificRoom,
    editSpecificRoom,
    deleteSpecificRoom,
    createRoom, 
    getAllRooms
} = require('../controllers/room')
const { validate } = require('../helpers/validate')
const { roomRequest } = require('../requests/roomRequest')


router.use(jwtHandler)
router.use(adminHandler)

router.post('/create', roomRequest(), validate, createRoom)

router.get('/', getAllRooms)

router.get('/:id', getSpecificRoom)

router.put('/:id', roomRequest(), validate, editSpecificRoom)

router.delete('/:id', deleteSpecificRoom)

module.exports = router