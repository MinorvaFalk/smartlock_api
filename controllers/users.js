const { users } = require('../data');
const { sequelize, User} = require('../models');

const getAllUsers = async (req, res) => {
    const userData = await User.findAll();
    return res.status(200).json(userData)
}

const getSpecificUsers = (req, res) => {
    const { nim } = req.params

    const singleUser = users.find((user) => user.nim === nim)

    if(!singleUser) {
        return res.status(404).send('User not found')
    }

    return res.status(200).json(singleUser)
}

const createUser = async (req, res) => {
    // dev
    users.forEach(async (user) => {
        await User.create(user);
    })
    const userData = await User.findAll();
    console.log(userData);
    
    return res.status(200).json(userData)
}

module.exports = {
    getAllUsers,
    getSpecificUsers,
    createUser
}