const { body } = require("express-validator")
const { Node } = require('../models/index');

let nodeRequest = () => {
    return [
        body('name')
            .not().isEmpty().withMessage('NIM Field is Required').bail()
            .isAlpha().withMessage('Must Be Numeric Value').bail()
    ] 
}

module.exports = { nodeRequest } ;