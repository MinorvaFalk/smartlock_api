const { body } = require("express-validator")
const { Node } = require('../models/index');

let nodeRequest = () => {
    return [
        body('name')
            .not().isEmpty().withMessage('Name Field is Required').bail()
            .isAlphanumeric( undefined ,{ignore: '-_'}).withMessage('Must Be Alpha Numeric w/o \'_-\' Value').bail()
    ] 
}

module.exports = { nodeRequest } ;