const { Node } = require('../models');

const createNode = async (req, res) => {
    let node = await Node.create(req.body);
    return res.status(200).json(node)
}

module.exports = {
    createNode
}