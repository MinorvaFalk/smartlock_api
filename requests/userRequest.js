const { body } = require("express-validator")
const { User } = require('../models/index');

let userRequest = () => {
    return [
        body('nim').isNumeric().withMessage('Must Be Numeric Value').custom(async value => {
            let user = await User.findAll({where: {nim: value}})
            console.log(user)
            if(user.length > 0) return Promise.reject('NIM is taken')
        }),
        body('uid').isAlphanumeric().withMessage('Must be Alpha Numeric Value').custom(async value => {
            let user = await User.findAll({where: {nim: value}})
            console.log(user)
            if(user.length > 0) return Promise.reject('UID is taken')}),
        body('email').isEmail().withMessage('Must be Email'),
        body('first_name').isAlpha().withMessage('Must be Alphabet'),
        body('last_name').isAlpha().withMessage('Must be Alphabet'),
        body('password'),
    ] 
}

module.exports = { userRequest } ;