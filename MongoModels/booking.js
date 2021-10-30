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
    check_in: {
        type: Date,
    },
    check_out: {
        type: Date,
    },
    duration: {
        type: Number,
        required: true,
    },
    room_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Waiting',
    },
    user_booking_nim: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    participant: Array
}, {timestamps: true})

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;