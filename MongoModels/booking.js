const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true,
    },
    start_time: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    room_id: {
        type: String,
        required: true,
    },
    participant: Array
}, {timestamps: true})

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;