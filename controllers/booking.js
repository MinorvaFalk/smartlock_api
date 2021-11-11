const Booking = require('../MongoModels/booking');
const currentUserHandler = require('../middleware/currentUserHandler')

const getAllBooking = async (req, res) => {
    const booking = await Booking.find();
    return res.status(200).json(booking)
}

const getSpecificBooking = (req, res) => {
    const { id } = req.params

    const singleBooking = Booking.find((data) => data.id === Number(id))
 
    if(!singleBooking) {
        return res.status(404).send('ID not found')
    }

        
    return res.json(singleBooking)
}

const createNewBooking = (req, res) => {
    const booking = new Booking(
        req.body
    )
    booking
        .save()
        .then((response) => res.status(200).send({'booking': response}))
        .catch((err) => console.log(err))
}

const editBooking = async (req, res) => {
    const { id } = req.params

    const singleBooking = await Booking.find((data) => data.id === Number(id))
 
    if(!singleBooking) {
        return res.status(404).send('ID not found')
    }

    if(!currentUserHandler(req, singleBooking)) {
        return res.sendStatus(403);
    }
}

const editStatusBooking = async (req, res) => {
    const { id, status } = req.params

    const singleBooking = await Booking.find((data) => data.id === Number(id))
 
    if(!singleBooking) {
        return res.status(404).send('ID not found')
    }

    Booking.updateOne({status: status}, (err, res) => {
        if(err) return res.sendStatus(500);
        return res.status(200).send('Booking status updated');
    })
}

module.exports = {
    getAllBooking,
    getSpecificBooking,
    createNewBooking,
    editBooking,
    editStatusBooking
}