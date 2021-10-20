const Booking = require('../MongoModels/booking');

const getAllBooking = async (req, res) => {
    const booking = await Booking.find();
    return res.status(200).json(booking)
}

const getSpecificBooking = (req, res) => {
    const { id } = req.params

    const singleBooking = booking.find((data) => data.id === Number(id))

    if(!singleBooking) {
        return res.status(404).send('ID not found')
    }

    return res.json(singleBooking)
}

const createNewBooking = (req, res) => {
    const booking = new Booking({
        start_date: Date.now(),
        end_date: Date.now(),
        check_in: Date.now(),
        start_time: '12345',
        duration: 25,
        room_id: 45,
        participant: [123,456]
    })
    booking
        .save()
        .then((response) => res.status(200).send({'booking': response}))
        .catch((err) => console.log(err))
}

module.exports = {
    getAllBooking,
    getSpecificBooking,
    createNewBooking
}