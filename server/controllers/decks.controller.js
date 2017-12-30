const config = require('../../db/db'),
  express = require('express'),
  router = express.Router(),
  deckService = require('../services/deck.service');

// routes
router.post('/', createDeck);
router.get('/', getDecks);
router.get('/getUserDecks/:id', getUserDecks);
router.get('/:id', getDeckById);
router.put('/:id', updateDeck);
router.delete('/:id', deleteDeck);

module.exports = router;

function createDeck(req, res) {
  deckService.createDeck(req.body)
    .then(function (deck) {
      res.status(200).send(deck);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getDecks(req, res) {
  deckService.getDecks()
    .then(function (decks) {
      res.status(200).send(decks);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getUserDecks(req, res) {
  deckService.getUserDecks(req.params.id)
    .then(function (decks) {
      if (decks) {
        res.status(200).send(decks);
      } else {
        res.status(400).send(err);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getDeckById(req, res) {
  deckService.getDeckById(req.params.id)
    .then(function (deck) {
      if (deck) {
        res.status(200).send(deck);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function updateDeck(req, res) {
  deckService.updateDeck(req.params.id, req.body)
    .then(function (deck) {
      res.status(200).send(deck);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function deleteDeck(req, res) {
  deckService.deleteDeck(req.params.id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
