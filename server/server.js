'use strict';

const config = require('../db/db'),
      restify = require('restify'),
      plugins = require('restify').plugins,
      mongodb = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      corsMiddleWare = require('restify-cors-middleware'),
      jwt = require('express-jwt');

const cors = corsMiddleWare({
  origins: ['http://localhost:4200', 'http://localhost:3000'],
  allowHeaders: ['Authorization']
});

let server = restify.createServer({
  name: config.name,
  version: config.version
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(plugins.jsonBodyParser({ mapParams: true }));
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser({ mapParams: true }));
server.use(plugins.fullResponse());

server.use(jwt({
  secret: config.secret,
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless(function(req) {
  return (req.url === '/users' && req.method === 'POST' || req.url === '/users/authenticate');
}));

server.listen(config.port, () => {

  // connect to mongoDB atlas
  mongoose.Promise = global.Promise;
  mongoose.connect(config.uri, { useMongoClient: true });

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    require('./routes/routes')(server);
    console.log(`Server is listening on port ${config.port}`);
  });

});
