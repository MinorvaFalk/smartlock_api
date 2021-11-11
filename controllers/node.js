const { Node, Room } = require('../models');
const Booking = require('../MongoModels/booking');

const createNode = async (req, res) => {
    let node = await Node.create(req.body);
    return res.status(200).json(node)
}

const checkNodeHealth = async (req, res) => {
    const { id } = req.params;
    const node = await Node.findOne({where: {id: id}});
    if(node === 'null') res.status(204) 
    node.status = 'active';
    await node.save()
    return res.status(200);
}


const checkRoom = async (req, res) => {
    const { id } = req.params;

    const room = await Room.findOne({where: {
        NodeId: id
    }}) 
    
    if (room === 'null') res.sendStatus(204)

    const booking = await Booking.find({room_id: room.id, start_date: {$gte: new Date().toISOString()}, participants: req.body.uid});

    console.log(typeof booking[0].check_in === "undefined");

    if(!typeof booking[0].check_in === "undefined") {
        const response = booking[0].updateOne({ check_in: Date.now()})  
        if (response) return res.sendStatus(200)
        else return res.sendStatus(500)
    }

    return res.sendStatus(200)
}

module.exports = {
    createNode,
    checkNodeHealth,
    checkRoom
}