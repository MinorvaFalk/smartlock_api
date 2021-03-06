const jwt = require('jsonwebtoken');

const adminHandler = (req, res, next) => {
    // Using authorization bearer header
    const req_token = req.headers['authorization'];
    if (typeof req_token === 'undefined' ) return res.status(401).send('No Authorization Header found'); 
    const token = req_token.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if(err) return res.sendStatus(403) // TODO: Change status code (?)
        if(decoded.role != 'admin') return res.sendStatus(403) // TODO: Change status code (?)
        next()
    });
}

module.exports = adminHandler