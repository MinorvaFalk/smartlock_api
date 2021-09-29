const { body } = require("express-validator")
const { User } = require('../models/index');

let userRequest = () => {
    return [
        body('nim')
            .not().isEmpty().withMessage('NIM Field is Required').bail()
            .isNumeric().withMessage('Must Be Numeric Value').bail()
            .custom(async value => {
                let user = await User.findAll({where: {nim: value}})
                if(user.length > 0) return Promise.reject('NIM is taken')
            }),

        body('uid')
            .not().isEmpty().withMessage('UID Field is Required').bail()
            .isAlphanumeric().withMessage('Must be Alpha Numeric Value').bail()
            .custom(async value => {
                let user = await User.findAll({where: {nim: value}})
                if(user.length > 0) return Promise.reject('UID is taken')
            }),

        body('email')
            .not().isEmpty().withMessage('Email Field is Required').bail()
            .isEmail().withMessage('Must be Email').bail()
            .custom(async value => {
                let user = await User.findAll({where: {email: value}})
                if(user.length > 0) return Promise.reject('Email is taken')
            }),

        body('first_name')
            .not().isEmpty().withMessage('First Name Field is Required').bail()
            .isAlpha().withMessage('Must be Alphabet'),

        body('last_name')
            .not().isEmpty().withMessage('Last Name Field is Required').bail()
            .isAlpha().withMessage('Must be Alphabet'),

        body('password')
            .not().isEmpty().withMessage('Password Field is Required').bail()
            .isLength({min: 6}),
    ] 
}

module.exports = { userRequest } ;