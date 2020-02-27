const Booking = require('../../models/booking.js');
const Event = require('../../models/event.js');
const { transformBooking } = require('./merge.js');

module.exports = {
    bookings: () => {
        return Booking
            .find()
            .then((bookings) => {
                return bookings.map((booking) => {
                    return transformBooking(booking);
                });
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },
    createBooking: (args) => {
        return Event
            .findOne({
                _id: args.bookingInput.event
            })
            .then((event) => {
                if (!event) {
                    throw new Error('Event does not exist');
                }

                return Booking.findOne({
                    user: args.bookingInput.user,
                    event: args.bookingInput.event
                });
            })
            .then(booking => {
                if (booking) {
                    throw new Error('Booking already exists.');
                }

                const newBooking = new Booking({
                    user: args.bookingInput.user,
                    event: args.bookingInput.event
                });

                return newBooking.save();
            })
            .then(result => {
                return transformBooking(result);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    },
    removeBooking: (args) => {
        return Booking
            .findOneAndDelete({ _id: args.bookingInput })
            .then((removedBooking) => {
                if (!removedBooking) {
                    throw new Error('Booking does not exist');
                }
                
                return transformBooking(removedBooking);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
};