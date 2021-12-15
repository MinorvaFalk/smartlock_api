const jwt = require('jsonwebtoken');

const currentUserHandler = (req, data) => {
    let nim;
    const req_token = req.headers['authorization'];
    const token = req_token.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        nim = decoded.nim
        
    });
    const model = req.originalUrl.split('/');
    if(model[2] === 'bookings') {
        if(data.user_booking_nim == nim) return true
        else return false 
    }
    return false
}

module.exports= currentUserHandler;