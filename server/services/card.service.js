const config = require('../../db/tcg'),
      https = require('https'),
      Q = require('q'),
      Token = require('../models/token');

let service = {};

service.getToken = getToken;
service.saveToken = saveToken;
service.checkDbToken = checkDbToken;
service.getTCGCard = getTCGCard;

module.exports = service;

function getToken() {

  const postData = `grant_type=client_credentials&client_id=${config.pubkey}&client_secret=${config.privkey}`;

  const options = {
    hostname: 'api.tcgplayer.com',
    path: '/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Tcg-Access-Token': config.token
    }
  };

  return new Promise(function(resolve, reject) {
    let token = "";

    const req = https.request(options, function(res) {
      res.on('data', (chunk) => {
        token += chunk;
      });

      res.on('end', () => resolve(token));
    });

    req.on('error', (err) => {
      console.error(`problem with request: ${err}`);
    });

    req.write(postData);
    req.end();
  });
}

function saveToken(token) {
  let data = new Token(token);
  data.save(function(err) {
    if (err) {
      return err;
    }
    else return null;
  });
  return null;
}

function checkDbToken() {
  let deferred = Q.defer();

  Token.findOne({ '.expires': { $gt: new Date() }}, function(err, token) {
    if (err) {
      deferred.reject(err.name);
    }

    if (token) {
      deferred.resolve(token);
    } else {
      getToken()
        .then(res => {
          let token = JSON.parse(res);
          saveToken(token);
          deferred.resolve(token);
        });
    }
  });
  return deferred.promise;
}

function getTCGCard(cardName) {

  return new Promise(function(resolve, reject) {
    checkDbToken()
      .then(res => {
        let token = 'bearer ' + res.access_token;
        let options = {
          hostname: 'api.tcgplayer.com',
          path: `/catalog/products?categoryId=1&getExtendedFields=true&productName=${cardName}`,
          headers: {
            Authorization: token
          }
        };
        let card = "";
        const req = https.get(options, function(res) {
          res.on('data', (chunk) => {
            card += chunk;
          });
          res.on('end', () => resolve(card));
        });
        req.on('error', (err) => {
          console.error(`problem with request: ${err}`);
        });
        req.end();
      });
  });
}

