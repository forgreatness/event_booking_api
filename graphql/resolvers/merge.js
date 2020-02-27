const User = require('../../models/user.js');
const Event = require('../../models/event.js');

const getUserById = (userId) => {
    return User
        .findById(userId)
        .then((user) => {
            return {
                ...user._doc,
                password: null,
                createdEvents: getEventsByIds.bind(this, user._doc.createdEvents)
            };
        })
        .catch((err) => {
            throw err;
        });
};

const getEventById = (eventId) => {
    return Event
        .findById(eventId)
        .then((event) => {
            return {
                ...event._doc,
                date: event._doc.date.toISOString(),
                creator: getUserById.bind(this, event._doc.creator)
            };
        })
        .catch((err) => {
            throw err;
        });
};

const getEventsByIds = (eventIds) => {
    return Event
        .find({ _id: { $in: eventIds } })
        .then((events) => {
            return events.map((event) => {
                return {
                    ...event._doc,
                    date: event._doc.date.toISOString(),
                    creator: getUserById.bind(this, event._doc.creator)
                };
            });
        })
        .catch((err) => {
            throw err;
        });
};

exports.transformEvent = (event) => {
    return {
        ...event._doc,
        date: event._doc.date.toISOString(),
        creator: getUserById.bind(this, event._doc.creator)
    };
};

exports.transformBooking = (booking) => {
    return {
        ...booking._doc,
        user: getUserById.bind(this, booking._doc.user),
        event: getEventById.bind(this, booking._doc.event),
        createdAt: booking._doc.createdAt.toISOString(),
        updatedAt: booking._doc.updatedAt.toISOString()
    };
};