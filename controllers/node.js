const { Node, Room, Sequelize } = require('../models');
const Booking = require('../MongoModels/booking');

const getAllNode = async (req, res) => {
    let node = await Node.findAll({ include: Room });
    return res.status(200).send(node);
}

const getSpecificNode = async (req, res) => {
    let {id} = req.params;
    const node = await Node.findOne({where: {id: id}, include: Room});
    return res.status(200).send(node)
}

const createNode = async (req, res) => {
    console.log(req.body.name)
    if(typeof req.body.name == 'undefined') return res.sendStatus(422)
    let node = await Node.create(req.body);
    return res.status(200).json(node)
}

const deleteSpecificNode = async (req, res) => {
    const { id } = req.params;

    const node = await Node.findOne({where: {id: id}});

    if (node == null) return res.sendStatus(422) 

    node.destroy().then(() => {
        return res.sendStatus(200)
    }).catch((err) => {
        console.log(error);
        return res.sendStatus(500)
    })
}

const checkActiveNode = async (req, res) => {
    const { id } = req.params;

    const node = await Node.findOne({where: {id: id}});

    console.log(node)

    if (node == null) return res.sendStatus(422) 

    node.status = 'active';
    node.last_check = Sequelize.literal('CURRENT_TIMESTAMP');

    await node.save()

    return res.sendStatus(200);
}

const editNode = async (req, res) => {
    const { id } = req.params;

    const node = await Node.findByPk(id);

    console.log(node)

    if (node == null) return res.sendStatus(422)

    node
        .update(req.body, { where: { id: id } })
        .then(async () => {
            const node = await Node.findByPk(id)
            return res.status(200).send(node)
        })
        .catch((err) => {
            return res.sendStatus(500)
        })
}

const checkRoom = async (req, res) => {
    const { id } = req.params;
    const { uid } = req.body

    if(typeof id == undefined || id == null || typeof uid == undefined || uid == null) return res.sendStatus(422);

    const room = await Room.findOne({where: {
        NodeId: id
    }}) 
    
    if (room == null) return res.sendStatus(204)

    const booking = await Booking.find({room_id: room.id, start_date: {$gte: new Date().toISOString()}, participants: req.body.uid});

    if (booking.length == 0) return res.sendStatus(204)

    if(!typeof booking[0].check_in === "undefined") {

        const response = booking[0].updateOne({ check_in: Date.now()})  

        if (response) return res.sendStatus(200)
        else return res.sendStatus(500)
    }

    return res.sendStatus(200)
}

module.exports = {
    createNode,
    checkActiveNode,
    checkRoom,
    deleteSpecificNode,
    getAllNode,
    getSpecificNode,
    editNode
}