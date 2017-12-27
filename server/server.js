require('rootpath');
const express = require('express'),
      config = require('../db/db'),
      bodyParser = require('body-parser'),
      mongodb = require('mongodb').MongoClient,
      mongoose = require('mongoose'),
      cors = require('cors'),
      jwt = require('express-jwt');

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(jwt({
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
  return (
    req.url === '/users' && req.method === 'POST' ||
    req.url === '/users/authenticate' ||
    req.url === '/cards/getToken' ||
    req.url === '/cards/checkToken' ||
    req.url.includes('/cards/getTCGCard')
  );
}));

app.use('/users', require('./controllers/users.controller'));
app.use('/cards', require('./controllers/cards.controller'));
app.use('/decks', require('./controllers/decks.controller'));

app.listen(config.port, function() {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.uri, { useMongoClient: true });

  const db = mongoose.connection;

  db.on('error', (err) => {
    console.error(err);
    process.exit(1);
  });

  db.once('open', () => {
    console.log(`Server is listening on port ${config.port}`);
  });
});
