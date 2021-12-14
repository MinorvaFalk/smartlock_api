const { body } = require("express-validator")
const { Room, User } = require('../models/index');

let bookingRequest = () => {
    return [
        body('room_id')
            .not().isEmpty().withMessage('Room_id is Required').bail()
            .isNumeric().withMessage('Must Be Numeric Value').bail()
            .custom(async value => {
                let room = await Room.findAll({where: {id: value}})
                if(!room.length > 0) return Promise.reject('No Room Found')
            }),

        body('user_booking_nim')
            .not().isEmpty().withMessage('NIM Field is Required').bail()
            .isNumeric().withMessage('Must Be Numeric Value').bail()
            .custom(async value => {
                let user = await User.findAll({where: {nim: value}})
                console.log(user)
                if(!user.length > 0) return Promise.reject('nim is not found')
            }),

        body('participant')
            .not().isEmpty().withMessage('Participant is Required').bail()
            .custom(async value => {
                let notId;
                value.forEach((item) => {
                    let user = await User.findOne({where: {uid: item}}),
                    if (user == null) notId == true;
                })
                if(!notId) return Promise.reject("UID Not Found")
            }),

        body('start_date')
            .not().isEmpty().withMessage('Start Date Field is Required').bail()
            .custom(value => {
                if(isNaN(Date.parse(value))) return Promise.reject('Start Date Field is not date')
                else return Promise.resolve()
            }),

        body('end_date')
            .not().isEmpty().withMessage('Start Date Field is Required').bail()
            .custom(value => {
                if(isNaN(Date.parse(value))) return Promise.reject('Start Date Field is not date')
                else return Promise.resolve()
            }),
    ] 
}

module.exports = { bookingRequest } ;