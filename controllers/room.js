const { Room, Node } = require('../models');

const getSpecificRoom = async (req, res) => {
    const { id } = req.params

    const room = await Room.findByPk(id, { include: Node });

    if (room == null) return res.sendStatus(422)

    return res.status(200).send(room);
}

const editSpecificRoom = async (req, res) => {
    const { id } = req.params

    const room = await Room.findByPk(id);

    if (room == null) return res.sendStatus(422)

    Room
        .update(req.body, { where: { id: id } })
        .then(async () => {
            const room = await Room.findByPk(id)
            return res.status(200).send(room)
        })
        .catch((err) => {
            return res.sendStatus(500)
        })

}

const createRoom = async (req, res) => {
    const room = await Room.create(req.body);

    await Node.update(
        { RoomId: room.id },
        { where: { id: req.body.NodeId } }
    )

    return res.status(200).json(room);
}

const deleteSpecificRoom = async (req, res) => {
    const { id } = req.params

    if (id == null) return res.sendStatus(404);

    const room = await Room.findByPk(id);

    room
        .destroy()
        .then(() => {
            return res.sendStatus(200)
        })
        .catch((err) => {
            console.log(err)
            return res.sendStatus(500)
        })
}

const getAllRooms = async (req, res) => {
    const rooms = await Room.findAll({ include: Node });
    return res.status(200).json(rooms);
}

module.exports = {
    editSpecificRoom,
    getSpecificRoom,
    deleteSpecificRoom,
    createRoom,
    getAllRooms
}