const express = require('express');
const bodyParser = require('body-parser');
const graphQLHttp = require('express-graphql');

const { connectToDB } = require('./lib/mongo.js');
const graphQLSchema = require('./graphql/schema.js');
const graphQLResolvers = require('./graphql/resolvers/index.js');

const app = express();

app.use(bodyParser.json());

app.use(
    '/graphql', 
    graphQLHttp({
        schema: graphQLSchema,
        rootValue: graphQLResolvers,
        graphiql: true
    })
);

app.use('*', function (req, res, next) {
    res.status(404).json({
        error: "Requested resource " + req.originalUrl + " does not exist"
    });
});

connectToDB(() => {
    app.listen(process.env.PORT, () => {
      console.log("== Server is listening on port:", process.env.PORT);
    });
});

