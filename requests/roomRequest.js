const { body } = require("express-validator")
const { Room, User, Node } = require('../models/index');

let roomRequest = () => {
    return [
        body('name')
            .not().isEmpty().withMessage('Name Field is Required').bail()
            .isAlpha(undefined,{ignore: ' -_'}).withMessage('Must Be Alpha Name').bail()
            .custom(async (value, {req}) => {
                let room = await Room.findAll({where: {name: value}})
                if(room.length > 0) {
                    if(room[0].id != req.params.id) return Promise.reject('Name Has Taken')
                }
            }),

        body('capacity')
            .not().isEmpty().withMessage('Capacity is Required').bail()
            .isNumeric().withMessage('Must Be Numeric Value').bail(),

        body('NodeId')
            .not().isEmpty().withMessage('NodeId is Required').bail()
            .isNumeric().withMessage('Must Be Numeric Value').bail()
            .custom(async (value, {req}) => {
                let node = await Node.findAll({where: {id: value}})
                console.log(node)
                if(node.length == 0) return Promise.reject('No Node Found')
                let room = await Room.findAll({where: {NodeId: value}})
                if(room.length > 0) {
                    if(room[0].id != req.params.id) return Promise.reject('Room Found')
                }
            }),
    ] 
}

module.exports = { roomRequest } ;