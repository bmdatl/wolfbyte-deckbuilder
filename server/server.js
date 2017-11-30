'use strict';

const config = require('../db/db'),
      restify = require('restify'),
      plugins = require('restify').plugins,
      mongodb = require('mongodb').MongoClient,
      oauthserver = require('restify-oauth-server');

let server = restify.createServer({
  name: config.name,
  version: config.version
});

server.oauth = new oauthserver({
  model: {
    getAccessToken() {},
    getAuthorizationCode() {},
    getClient() {},
    getRefreshToken() {},
    revokeAuthorizationCode() {},
    revokeToken() {},
    saveAuthorizationCode() {},
    saveToken() {},
    validateScope() {}
  }
});

server.use(plugins.jsonBodyParser({ mapParams: true }));
server.use(plugins.authorizationParser());
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser({ mapParams: true }));
server.use(plugins.fullResponse());
server.use(function(req, res, next) {
  if(req.headers['content-type'] === 'application/x-www-url-formencoded') req.body = req.params;
  return next();
});

server.post('/oauth/token', server.oauth.token());

server.get('/secret', server.oauth.authenticate(), (req, res, next) => {
  res.send('Authenticated!');
});

server.listen(config.port, () => {

  // connect to mongoDB atlas
  mongodb.connect(config.uri, (err, db) => {
    if (err) {
      console.log('An error occurred while attempting to connect to MongoDB', err);
      process.exit(1);
    }
    console.log(
      '%s v%s ready to accept connections on port %s in %s environment.',
      server.name,
      config.version,
      config.port,
      config.env
    );

    require('./routes/routes')({ db, server })
  });

});
