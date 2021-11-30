const { body } = require("express-validator")
const { Room, User } = require('../models/index');

let roomRequest = () => {
    return [
        body('name')
            .not().isEmpty().withMessage('Name Field is Required').bail()
            .isAlpha().withMessage('Must Be Alpha Name').bail()
            .custom(async value => {
                let room = await Room.findAll({where: {name: value}})
                if(room.length > 0) return Promise.reject('Name Has Taken')
            }),

        body('capacity')
            .not().isEmpty().withMessage('Capacity is Required').bail()
            .isNumeric().withMessage('Must Be Numeric Value').bail(),

        body('NodeId')
            .not().isEmpty().withMessage('NodeId is Required').bail()
            .isNumeric().withMessage('Must Be Numeric Value').bail()
            .custom(async (value) => {
                let room = await Room.findAll({where: {NodeId: value}})
                if(room.length > 0) return Promise.reject('Room Found')
            }),
    ] 
}

module.exports = { roomRequest } ;