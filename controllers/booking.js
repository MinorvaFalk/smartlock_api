const Booking = require('../MongoModels/booking');
const { Room, User } = require('../models')
const currentUserHandler = require('../middleware/currentUserHandler')

const getAllBooking = async (req, res) => {
    const booking = await Booking.find();
    return res.status(200).json(booking)
}

const getSpecificBooking = async (req, res) => {
    const { id } = req.params

    const singleBooking = await Booking.findById(id)

    if (!singleBooking) {
        return res.status(422).send('ID not found')
    }

    return res.status(200).send(singleBooking)
}

const deleteSpecificBooking = async (req, res) => {
    const { id } = req.params

    
    const singleBooking = await Booking.findById(id)

    if (!singleBooking) {
        return res.status(422).send('ID not found')
    }

   const deleted = await Booking.deleteOne({_id: id});

   if(deleted.deletedCount < 1) return res.sendStatus(500)

   return res.sendStatus(200)

}


const createNewBooking = async (req, res) => {
    
    const start_date = new Date(req.body.start_date);

    const end_date = new Date(req.body.end_date);

    if(end_date.getDay() - start_date.getDay() > 0 || (end_date.getHours() + 7) - (start_date.getHours()+7) > 2 ) return res.sendStatus(422)

    const booked_time = new Date(req.body.start_date);

    booked_time.setHours(-1)

    const booked_room = await Booking.find({start_date: {$lte: start_date, $gte: booked_time}, duration: {$lte: 120, $gte: 60}, end_date: {$ne: start_date}});

    if (booked_room.length > 0) return res.status(422).json({message: "Time is not available"})

    req.body.duration = ((end_date.getHours() + 7) - (start_date.getHours()+7)) * 60;

    const booking = new Booking(req.body);

    booking
        .save()
        .then((response) => res.status(200).send({ 'booking': response }))
        .catch((err) => res.status(500).send(err))
}

const editBooking = async (req, res) => {
    const { id } = req.params
    const { participant } = req.body
    
    const singleBooking = await Booking.findById(id);
    
     if (!currentUserHandler(req, singleBooking)) {
         return res.sendStatus(403);
     }
    
    if (!singleBooking) {
        return res.status(422).send('ID not found')
    }


    try {

        singleBooking.participant = participant
        let booking = await singleBooking.save();
        return res.status(200).send({message: 'Booking updated', booking: booking});

    } catch (err) {

        return res.sendStatus(500)

    }

    
}

const editStatusBooking = async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    const singleBooking = await Booking.findById(id)

    if (!singleBooking) {
        return res.status(422).send('ID not found')
    }

    try {
        
        singleBooking.status = status;
        let booking = await singleBooking.save();
        return res.status(200).send({message: 'Booking status updated', booking: booking});

    } catch (err) {

        console.log(err)
        return res.sendStatus(500);

    }
}

const checkAvailability = async (req, res) => {
    const { date, start_time, end_time } = req.query;

    if ((date == null || typeof date == 'undefined') ||
        (start_time == null || typeof start_time == 'undefined') ||
        (end_time == null || typeof end_time == 'undefined')) return res.sendStatus(422)


    const book_time = new Date(date+'T'+start_time+'+0700');
    const end_book_time = new Date(date+'T'+end_time+'+0700')

    if( (end_book_time.getHours() + 7) - (book_time.getHours() + 7) > 2 || (book_time.getHours() + 7) > (end_book_time.getHours() + 7)) return res.sendStatus(422)

    const booked_time = new Date(date+'T'+start_time+'+0700');

    booked_time.setHours(-1)

    let booked_room = await Booking.find({start_date: {$lte: book_time, $gte: booked_time}, duration: {$lte: 120, $gte: 60}, end_date: {$ne: book_time}}).distinct('room_id');
    const rooms = await Room.findAll({attributes: ['id']});
    
    let attributes = ['id','name','capacity'];

    let unbooked_room_id = [];
    
    booked_room = booked_room.map((item) => parseInt(item));

    console.log(booked_room);

    rooms.forEach((item) => {
        unbooked_room_id.push(item.id);
    })

    if (booked_room.length > 0) {
        console.log('booked');
        let booked_room_id = unbooked_room_id.filter((item) => !booked_room.includes(item))

        let booked_rooms = await Room.findAll({where: {id: booked_room_id}, attributes: attributes})
        
        return res.status(200).send({rooms: booked_rooms});
    }
    
    let unbooked_room = await Room.findAll({where: {id: unbooked_room_id}, attributes: attributes})

    return res.status(200).send({room: unbooked_room})

}

const getAllUserBooking = async (req, res) => {
    const { nim } = req.params;

    if( !nim ) return res.sendStatus(400)

    const booking = await Booking.find({user_booking_nim: nim});

    if (!booking) return res.sendStatus(422);

    return res.status(200).send(booking);
}

module.exports = {
    getAllBooking,
    getSpecificBooking,
    createNewBooking,
    editBooking,
    editStatusBooking,
    checkAvailability,
    deleteSpecificBooking,
    getAllUserBooking
}