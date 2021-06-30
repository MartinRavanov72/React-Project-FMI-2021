import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    eventName: String,
    name: String,
    creator: String,
    venue: String,
    goings: { type: [String], default: [] },
    date: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Event = mongoose.model('Event', eventSchema);

export default Event;