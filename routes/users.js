const express = require('express')
const { userRequest } = require('../requests/userRequest');
const { validate } = require('../helpers/validate');
const adminHandler = require('../middleware/adminHandler')

const router = express.Router()

const {
    getAllUsers,
    getSpecificUsers,
    createUser
} = require('../controllers/users')

const jwtHandler = require('../middleware/jwtHandler')
router.use(jwtHandler)

// Get all
router.get('/', getAllUsers)

router.post('/create', adminHandler, userRequest(), validate, createUser)
  
// Get specific nim
router.get('/:nim', getSpecificUsers)



module.exports = router