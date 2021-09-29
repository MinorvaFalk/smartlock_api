const { users } = require('../data');
const { sequelize, User} = require('../models');
const user = require('../models/user');


const getAllUsers = async (req, res) => {
    const userData = await User.findAll();
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
    // dev
    // users.forEach(async (user) => {
    //     await User.create(user);
    // })
    // const userData = await User.findAll();
    // console.log(userData);

    // prod
    const errors = validationResult(req);

    console.log(errors);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // let userData = await User.create(req.body);

    // return res.status(200).json(userData)
}

module.exports = {
    getAllUsers,
    getSpecificUsers,
    createUser
}