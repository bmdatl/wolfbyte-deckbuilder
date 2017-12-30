const config = require('../../db/db'),
  _ = require('lodash'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  Q = require('q'),
  Deck = require('../models/deck');

let service = {};

service.createDeck = createDeck;
service.getDecks = getDecks;
service.getUserDecks = getUserDecks;
service.getDeckById = getDeckById;
service.updateDeck = updateDeck;
service.deleteDeck = deleteDeck;

module.exports = service;

function createDeck(body) {
  let deferred = Q.defer();

  Deck.findOne({ name: body.name, user_id: body.user_id }, function (err, deck) {
    if (deck) {
      // user has already created a deck with this name
      deferred.reject("you have a deck with this name already.");
    } else if (err) {
      deferred.reject(err.name + ': ' + err.message);
    } else {
      let deck = new Deck(body);

      deck.save(function(err, doc) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        }
        deferred.resolve(doc);
      });
    }
  });
  return deferred.promise;
}

function getDecks() {
  let deferred = Q.defer();

  Deck.find(function (err, decks) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(decks);
  });
  return deferred.promise;
}

function getUserDecks(user_id) {
  let deferred = Q.defer();

  Deck.find({ user_id: user_id }, function (err, decks) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(decks);
  });
  return deferred.promise;
}

function getDeckById(_id) {
  let deferred = Q.defer();

  Deck.findOne({ _id: _id }, function(err, deck) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (deck) {
      deferred.resolve(deck);
    } else {
      deferred.reject("deck not found");
    }
  });
  return deferred.promise;
}

function updateDeck(_id, body) {
  let deferred = Q.defer();

  Deck.findOne({ _id: _id }, function(err, deck) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (deck) {
      Deck.update({ _id: _id }, data, function (err, doc) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        }
        deferred.resolve(data);
      });
    }
  });
  return deferred.promise;
}

function deleteDeck(_id) {
  let deferred = Q.defer();

  Deck.remove({ _id: _id }, function(err) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve();
  });
  return deferred.promise;
}
