const express = require('express');
const router = express.Router();

const {
    createNode,
    checkNodeHealth,
    checkRoom
} = require('../controllers/node');
const adminHandler = require('../middleware/adminHandler');

router.get('/:id/health', checkNodeHealth);

router.post('/create', adminHandler, createNode);

router.post('/:id/edit', adminHandler, createNode);

router.post('/:id/check', checkRoom);


module.exports = router

