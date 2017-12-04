const User = require('../models/user'),
      config = require('../../db/db'),
      error = require('restify-errors'),
      bcrypt = require('bcrypt'),
      Q = require('q'),
      // userService = require('../services/user.service'),
      jwt = require('jsonwebtoken');

module.exports = function(server) {



  /*
  AUTHENTICATE USER
   */
  server.post('/users/authenticate', function(req, res) {

    let username = req.body.username,
        email = req.body.email,
        password = req.body.password;

    User.findOne({ username: username }, function(err, user) {
      if (err) {
        console.error(err);
      }

      if (user && bcrypt.compareSync(password, user.password)) {
        // auth successful
        let returnUser = new Promise(function(resolve, reject) {
          user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            token: jwt.sign({sub: user._id}, config.secret)
          };
           resolve(user);
        });
        //user['token'] = jwt.sign({sub: user._id}, config.secret);
        //res.send(200, returnUser);
        return returnUser.then(user => {
          res.send(user);
        });
      } else {
        // auth failed
        return null;
      }
    });
  });

  /*
  CREATE NEW USER
   */
  server.post('/users', (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new error.InvalidContentError("Expects '/application/json'"));
    }

    let data = req.body || {};
    let user = new User(data);

    user.save((err, userData) => {
      if (err) {
        console.error(err);
        return next(new error.InternalError(err.message));
      }
      res.send(201, userData);
      next();
    });
  });

  /*
  GET ALL USERS
   */
  server.get('/users', (req, res, next) => {
    User.apiQuery(req.params, (err, users) => {
      if (err) {
        console.error(err);
        return next(new error.InternalError(err.message));
      }
      res.send(users);
      next();
    });
  });

  /*
  GET USER BY ID
   */
  server.get('/users/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id }, (err, user) => {
      if (err) {
        console.error(err);
        return next(new error.InternalError(err.message));
      }
      res.send(200, user);
      next();
    });
  });

  /*
  UPDATE USER
   */
  server.put('/users/:id', (req, res, next) => {
    if (!req.is('application/json')) {
      return next(new error.InvalidContentError("Expects 'application/json"));
    }

    let id = req.params.id;
    let data = req.body || {};
    // if (!data._id) {
    //   data = Object.assign({}, data, { _id: req.params.id });
    // }

    User.findOne({ _id: id }, (err, user) => {
      if (err) {
        console.error(err);
        return next(new error.InternalError(err.message));
      } else if (!user) {
        return next(new error.ResourceNotFoundError('Requested user could not be found.'));
      }

      User.update({ _id: id }, data, (err) => {
        if (err) {
          console.error(err);
          return next(new error.InternalError(err.message));
        }
        res.send(200, data);
        next();
      });
    });
  });

  /*
  DELETE USER
   */
  server.del('/users/:id', (req, res, next) => {
    User.remove({ _id: req.params.id }, (err) => {
      if (err) {
        console.error(err);
        return next(new error.InternalError(err.message));
      }
      res.send(204, `User with id ${req.params.id} has been deleted.`);
      next();
    });
  });

};
