const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    creater: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    startDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },

    tags: [String],
    publicId: String,
    tags: [String]
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;