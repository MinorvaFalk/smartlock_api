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

    console.log(uid)

    if(typeof id == undefined || id == null || typeof uid == undefined || uid == null) return res.sendStatus(422);

    const room = await Room.findOne({where: {
        NodeId: id
    }}) 
    
    const book_start = new Date();
    book_start.setHours(book_start.getHours() - 2)
    const book_end = new Date();
    book_end.setHours(book_end.getHours() + 2)

    if (room == null) return res.sendStatus(204)

    const booking = await Booking.find({room_id: room.id, start_date: {$gte: book_start}, end_date: {$lte: book_end}, participants: req.body.uid});

    console.log(booking)

    if (booking.length == 0) return res.sendStatus(204)

    booking[0].check_in = new Date()

    const response = await booking[0].save()

    console.log(response)

    if (response) return res.sendStatus(200)
    else return res.sendStatus(500)

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