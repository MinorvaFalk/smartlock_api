const express = require('express');
const router = express.Router();

const {
    createNode,
    checkActiveNode,
    checkRoom,
    getAllNode,
    getSpecificNode,
    deleteSpecificNode,
    editNode
} = require('../controllers/node');
const { validate } = require('../helpers/validate');
const adminHandler = require('../middleware/adminHandler');
const { nodeRequest } = require('../requests/nodeRequest');

router.get('/', adminHandler, getAllNode)

router.post('/create', adminHandler, createNode);

router.put('/:id/edit', adminHandler, nodeRequest(), validate, editNode);

router.post('/:id/check', checkRoom);

router.get('/:id/checkActive', checkActiveNode);

router.get('/:id', adminHandler, getSpecificNode);

router.delete('/:id', adminHandler, deleteSpecificNode);

module.exports = router

