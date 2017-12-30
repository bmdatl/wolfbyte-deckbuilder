const config = require('../../db/db'),
      _ = require('lodash'),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcrypt'),
      Q = require('q'),
      User = require('../models/user');

let service = {};

service.authenticate = authenticate;
service.createUser = createUser;
service.getUsers = getUsers;
service.getUserById = getUserById;
service.updateUser = updateUser;
service.deleteUser = deleteUser;

module.exports = service;

function authenticate(email, password) {
  let deferred = Q.defer();

  User.findOne({ email: email }, function(err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      // auth successful
      deferred.resolve({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: jwt.sign({sub: user._id}, config.secret)
      });
    } else {
      // auth failed
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function createUser(body) {
  let deferred = Q.defer();

  User.findOne({ email: body.email }, function (err, user) {
    if (user) {
      // email already exists
      deferred.reject("email '" + body.email + "' already exists");
    } else if (err) {
      deferred.reject(err.name + ': ' + err.message);
    } else {
      let hashed_pw = bcrypt.hashSync(body.password, 10);
      body.password = hashed_pw;
      let newUser = new User(body);

      newUser.save(function(err, doc) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        }
        deferred.resolve();
      });
    }
  });
  return deferred.promise;
}

function getUsers() {
  let deferred = Q.defer();

  User.find(function (err, users) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve(users);
  });
  return deferred.promise;
}

function getUserById(_id) {
  let deferred = Q.defer();

  User.findOne({ _id: _id }, function(err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      deferred.resolve(user);
    } else {
      deferred.reject("user not found");
    }
  });
  return deferred.promise;
}

function updateUser(_id, body) {
  let deferred = Q.defer();

  User.findOne({ _id: _id }, function(err, user) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }

    if (user) {
      let data = {
        username: body.username,
        email: body.email
      };

      if (body.password) {
        data.password = bcrypt.hashSync(body.password, 10);
      }

      User.update({ _id: _id }, data, function(err, doc) {
        if (err) {
          deferred.reject(err.name + ': ' + err.message);
        }
        deferred.resolve(data);
      });
    }
  });
  return deferred.promise;
}

function deleteUser(_id) {
  let deferred = Q.defer();

  User.remove({ _id: _id }, function(err) {
    if (err) {
      deferred.reject(err.name + ': ' + err.message);
    }
    deferred.resolve();
  });
  return deferred.promise;
}




