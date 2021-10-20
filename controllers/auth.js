const { User } = require('../models');
const bcrypt = require('bcrypt')

const checkLogin = async (req, res) => {
    const { email, password } = req.body

    // Search for corresponding email
    const searchEmail = await User.findOne({
        where: {
            email: email,
        }
    });

    console.log(searchEmail);
    
    if(searchEmail){
        bcrypt.compare(password, searchEmail.password, function(err, result) {
            if(result){
                // Add JWT Token Signing

                return res.status(200).send(`Welcome ${email}`)
            }
            else {
                return res.status(401).send('Wrong Credentials')
            }
        });
    }else {
        return res.status(401).send('Invalid Credentials')
    }
}

module.exports = {
    checkLogin
}