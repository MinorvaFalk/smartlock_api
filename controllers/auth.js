const { User } = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const checkLogin = async (req, res) => {
    const { email, password } = req.body

    if(typeof email === 'undefined' || typeof password === 'undefined') return res.sendStatus(400);
    // Search for corresponding email
    const user = await User.findOne({
        where: {
            email: email,
        }
    });

    if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                jwt.sign({ nim: user.nim, name: user.first_name + user.last_name, role: user.role }, process.env.JWT_SECRET, function (err, token) {
                    if (token) return res.json({ token: token })
                    else return res.status(500).send('jwt error');
                })

            }
            else {
                return res.status(401).send('Wrong Credentials')
            }
        });
    } else {
        return res.status(401).send('Invalid Credentials')
    }
}

module.exports = {
    checkLogin
}