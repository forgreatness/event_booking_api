const Event = require('../../models/event.js');
const User = require('../../models/user.js');
const { transformEvent } = require('./merge.js');

module.exports = {
    events: () => {
        return Event
            .find()
            .then(events => {
                return events.map(event => {
                    return transformEvent(event);
                });
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    createEvent: (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '5e56eccb99f31051a023a402'
        });

        let createdEvent;
        // we use "return event" here to let the resolver that it will execute this async and wait for it to complete
        return event
            .save()
            .then(result => {
                // ... is a spread operator
                createdEvent = transformEvent(result);
                return User.findById('5e56eccb99f31051a023a402');
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
                throw err;
            });
    }
};