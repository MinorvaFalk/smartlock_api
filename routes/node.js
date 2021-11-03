const express = require('express');
const router = express.Router();

const {
    createNode
} = require('../controllers/node');
const adminHandler = require('../middleware/adminHandler');

router.use(adminHandler)

router.post('/create', createNode);

module.exports = router

