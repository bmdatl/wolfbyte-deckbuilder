var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var config = require('./db/db.js');

var mongodb = mongo.MongoClient;
var ObjectID = mongo.ObjectID;

var DECKS_COLLECTION = 'decks';
var app = express();

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// create a database variable outside of the database connection call
var db;

// connect to the db before starting the app server
mongodb.connect(config.uri, function(err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // save database object from the callback for reuse
  db = database;
  console.log("database connection ready");

  // initialize app
  var server = app.listen(config.port || 8080, function () {
    var port = server.address().port;
    console.log("app now running on port", port);
  });
});

// generic error handler for all endpoints
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*
 *
 * DECKS API ROUTES
 *
 */

app.get('/api/decks', function(req, res) {
  db.collection(DECKS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get decks.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/decks', function(req, res) {
  var newDeck = req.body;

  if (!req.body.name) {
    handleError(res, "Invalid deck entry.", "Must provide a name.", 400);
  }

  db.collection(DECKS_COLLECTION).insertOne(newDeck, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create a new deck.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

app.get('/api/decks/:id', function(req, res) {

});

app.put('/api/decks/:id', function(req, res) {

});

app.delete('/api/decks/:id', function(req, res) {

});




/*
 *
 * USERSAPI ROUTES
 *
 */
