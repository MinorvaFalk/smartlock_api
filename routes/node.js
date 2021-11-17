const express = require('express');
const router = express.Router();

const {
    createNode,
    checkActiveNode,
    checkRoom,
    getAllNode,
    getSpecificNode,
    deleteSpecificNode
} = require('../controllers/node');
const adminHandler = require('../middleware/adminHandler');

router.get('/', adminHandler, getAllNode)

router.post('/create', adminHandler, createNode);

router.put('/:id/edit', adminHandler, createNode);

router.post('/:id/check', checkRoom);

router.get('/:id/checkActive', checkActiveNode);

router.get('/:id', adminHandler, getSpecificNode);

router.delete('/:id', adminHandler, deleteSpecificNode);

module.exports = router

