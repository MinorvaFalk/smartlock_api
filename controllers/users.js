const { users } = require('../data');
const { Sequelize, User} = require('../models');
const user = require('../models/user');
const bcrypt = require("bcrypt");
const Op = Sequelize.Op;

const getAllUsers = async (req, res) => {
    const userData = await User.findAll({
        where: {
            [Op.not]: {role: 'admin'}
        }
    });
    return res.status(200).json(userData)
}

const getSpecificUsers = async (req, res) => {
    const { nim } = req.params

    const singleUser = await user.findAll({
        where: {
            nim: nim
        }
    })

    if(!singleUser) {
        return res.status(404).send('User not found')
    }

    return res.status(200).json(singleUser)
}


const createUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10);

    req.body.password = await bcrypt.hash(req.body.password, salt);

    let userData = await User.create(req.body);

    return res.status(200).json(userData)
}

module.exports = {
    getAllUsers,
    getSpecificUsers,
    createUser
}