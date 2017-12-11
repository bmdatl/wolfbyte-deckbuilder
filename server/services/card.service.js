const config = require('../../db/tcg'),
      https = require('https'),
      Token = require('../models/token');

let service = {};

service.getToken = getToken;
service.saveToken = saveToken;

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
