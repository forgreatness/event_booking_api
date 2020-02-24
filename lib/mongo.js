
/*
 * Module for working with a MongoDB connection.
 */

const mongoose = require('mongoose');

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDBName = process.env.MONGO_DB_NAME;

const mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;

exports.connectToDB = (callback) => {
    mongoose
        .connect(
            mongoUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        ).then(() => {
            callback();
        }).catch(err => {
            console.log(err);
        });
};