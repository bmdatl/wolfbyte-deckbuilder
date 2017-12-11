const config = require('../../db/tcg'),
  express = require('express'),
  router = express.Router(),
  cardService = require('../services/card.service');

// routes TODO: finish routes!
router.post('/getToken', getToken);

module.exports = router;

function getToken(req, res) {
  let data = {
    ACCESS_TOKEN: config.token,
    PUBLIC_KEY: config.pubkey,
    PRIVATE_KEY: config.privkey
  };
  cardService.getToken(data)
    .then(function(token) {
      saveToken(JSON.parse(token));
      res.status(200).send(token);
    })
    .catch(function(err) {
      res.status(400).send(err.message);
    });
}

function saveToken(token) {
  cardService.saveToken(token);
}


