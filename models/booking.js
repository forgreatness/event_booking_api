const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const bookingSchema = new Schema(
    {
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,

    }
);

bookingSchema.index({event: 1, user: 1}, {unique: true});

module.exports = mongoose.model('Booking', bookingSchema);