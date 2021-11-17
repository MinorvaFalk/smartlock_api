const currentUserHandler = (req, data) => {
    const { id } = req.params;
    const model = req.originalUrl.replace('/api/', '');
    if(model === 'bookings') {
        if(data.user_booking_nim == id) return true
        else return false 
    }
    return false
}

module.exports= currentUserHandler;