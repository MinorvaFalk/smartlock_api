import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema({
    start_date: Date,
    end_date: Date,
    start_time: String,
    duration: Number,
    room_id: String,
    participant: Array
})

const booking = mongoose.model('booking', BookingSchema);

export default booking;