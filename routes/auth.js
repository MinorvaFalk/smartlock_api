const express = require('express')
const router = express.Router()

const {
    checkLogin
} = require('../controllers/auth')

const {
    createUser
} = require('../controllers/users')

const { userRequest } = require('../requests/userRequest');
const { validate } = require('../helpers/validate');

router.post('/login', checkLogin )

router.post('/register', userRequest(), validate, createUser)

module.exports = router