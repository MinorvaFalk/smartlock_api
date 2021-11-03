const { Room, Node } = require('../models');

const checkBooking = (req, res) => {
    const id = req.body.id;
    // const Room = await Room.findOne({where: {node_id: id}});
    return res.status(200).send(id)
}

const createRoom = async (req, res) => {
    const room = await Room.create(req.body);
    await Node.update(
        {RoomId: room.id},
        {where: {id: req.body.NodeId}}
        )
    return res.status(200).json(room);
}

const getAllRooms = async (req, res) => {
    const rooms = await Room.findAll({ include: Node});
    return res.status(200).json(rooms);
}

module.exports = {
    checkBooking,
    createRoom,
    getAllRooms
}