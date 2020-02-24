const bcrypt = require('bcryptjs');

const Event = require('../models/event.js');
const User = require('../models/user.js');

const user = (userId) => {
    return User
        .findById(userId)
        .then((user) => {
            return {
                ...user._doc,
                createdEvents: events.bind(this, user._doc.createdEvents)
            };
        })
        .catch((err) => {
            throw err;
        });
};

const events = (eventIds) => {
    return Event
        .find({ _id: { $in: eventIds } })
        .then((events) => {
            return events.map((event) => {
                return {
                    ...event._doc,
                    date: event._doc.date.toISOString(),
                    creator: user.bind(this, event._doc.creator)
                };
            });
        })
        .catch((err) => {
            throw err;
        });
}

/* Notes
 * !after type means that it can not be null
*/
module.exports = {
    events: () => {
        return Event
            .find()
            .then(events => {
                return events.map(event => {
                    return {
                        ...event._doc,
                        date: event._doc.date.toISOString(),
                        creator: user.bind(this, event._doc.creator)
                    };
                });
            })
            .catch(err => {
                console.log(err);
            });
    },
    createEvent: (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5e51c6ab7badd8aaf6f408e1'
        });

        let createdEvent;
        // we use "return event" here to let the resolver that it will execute this async and wait for it to complete
        return event
            .save()
            .then(result => {
                // ... is a spread operator
                createdEvent = { 
                    ...result._doc, 
                    date: result._doc.date.toISOString(),
                    creator: user.bind(this, result._doc.creator)
                };
                return User.findById('5e524ed2a2d1fb37907fa2dc');
            })
            .then(user => {
                if (!user) {
                    throw new Error('User not found.');
                }
                user.createdEvents.push(event);
                return user.save();
            })
            .then(result => {
                return createdEvent;
            })
            .catch(err => {
                console.log(err);
            });
    },
    createUser: (args) => {
        return User
            .findOne({
                email: args.userInput.email
            })
            .then(user => {
                if (user) {
                    throw new Error('User exists already.')
                }
                return bcrypt
                    .hash(args.userInput.password, 12)
            })
            .then(hashedPassword => {
                const user = new User({
                    email: args.userInput.email,
                    password: hashedPassword
                });

                return user.save();
            })
            .then(result => {
                return { ...result._doc, password: null };
            })
            .catch(err => {
                console.log(err);
            });
    }
}