const { buildSchema } = require('graphql');

module.exports = buildSchema(
    `
        type Booking {
            _id: ID!
            user: User!
            event: Event!
            createdAt: String!
            updatedAt: String!
        }

        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
            creator: User!
        }

        type User {
            _id: ID!
            email: String!
            password: String
            createdEvents: [Event!]
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        input BookingInput {
            user: ID!
            event: ID!
        }

        type Query {
            events: [Event!]!
            bookings: [Booking!]! 
        }

        type Mutation {
            createEvent(eventInput: EventInput): Event!
            createUser(userInput: UserInput): User!
            createBooking(bookingInput: BookingInput): Booking!
            removeBooking(bookingInput: ID!): Booking!
        }

        schema {
            query: Query
            mutation: Mutation
        }
    `
)