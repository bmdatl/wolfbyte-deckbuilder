'use strict'

module.exports = function(context) {
  // extract context from passed in object
  const db = context.db,
        server = context.server;

  let ObjectId = require('mongodb').ObjectId;

  const users = db.collection('users');
  const decks = db.collection('decks');

  /*
  CREATE NEW USER
   */

  server.post('/users', (req, res, next) => {
    // extract data from body and add timestamps
    const data = Object.assign({}, req.body, {
      created: new Date(),
      updated: new Date()
    });

    users.insertOne(data)
      .then(doc => res.send(200, doc.ops[0]))
      .catch(err => res.send(500, err));

    next()

  });

  /*
  GET USER BY ID
   */

  server.get('/users/:id', (req, res, next) => {
    users.findOne(ObjectId(req.params.id))
      .then(doc => res.send(200, doc))
      .catch(err => res.send(500, err));

    next()

  });

  /*
  GET ALL USERS
   */

  server.get('/users', (req, res, next) => {
    let query = req.query || {};
    users.find(query).toArray()
      .then(docs => res.send(200, docs))
      .catch(err => res.send(500, err));

    next()

  });

  /*
  UPDATE USER
   */

  server.put('/users/:id', (req, res, next) => {
    const data = Object.assign({}, req.body, {
      updated: new Date()
    });

    let query = { _id: ObjectId(req.params.id) },
        body = { $set: data },
        options = {
          returnOriginal: false,
          upsert: true
        };

    users.findOneAndUpdate(query, body, options)
      .then(doc => res.send(204))
      .catch(err => res.send(500, err));

    next()

  });

  /*
  DELETE USER
   */

  server.del('/users/:id', (req, res, next) => {
    users.findOneAndDelete({ _id: ObjectId(req.params.id) })
      .then(doc => res.send(204))
      .catch(err => res.send(500, err));

    next()

  });

};
