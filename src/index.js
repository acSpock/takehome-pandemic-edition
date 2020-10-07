const express = require('express');
const typeDefs = require('./types');
const resolvers = require('./resolvers');
const { basicAuthenticate, requestLogger } = require('./middleware');
const { context, dataSources } = require('./server');
const connectDB = require('../config/db.js');
const { ApolloServer } = require('apollo-server-express');

const app = express();
connectDB();

/** protect '/api' with basic auth **/
const path = '/api';
app.use(path, requestLogger, basicAuthenticate);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    context
});


server.applyMiddleware({ app, path });
app.listen({ port: 4000 }, () =>
    console.log(`Listening on http://localhost:4000${server.graphqlPath}`)
);