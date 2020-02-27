const authResolver = require('./auth.js');
const eventResolver = require('./event.js');
const bookingResolver = require('./booking.js');

module.exports = {
    ...authResolver,
    ...eventResolver,
    ...bookingResolver
};