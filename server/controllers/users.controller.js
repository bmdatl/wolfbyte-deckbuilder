const config = require('../../db/db'),
      express = require('express'),
      router = express.Router(),
      userService = require('../services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

function authenticate(req, res) {
  userService.authenticate(req.body.email, req.body.password)
    .then(function (user) {
      if (user) {
        // auth successful
        res.status(200).send(user);
      } else {
        // auth failed
        res.status(400).send('Incorrect email or password');
      }
    })
    .catch(function (err) {
      res.status(400).send(err.message);
    });
}

function createUser(req, res) {
  userService.createUser(req.body)
    .then(function (user) {
      res.status(200).send(user);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getUsers(req, res) {
  userService.getUsers()
    .then(function (users) {
      res.status(200).send(users);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function getUserById(req, res) {
  userService.getUserById(req.params.id)
    .then(function (user) {
      if (user) {
        res.status(200).send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function updateUser(req, res) {
  userService.updateUser(req.params.id, req.body)
    .then(function (user) {
      res.status(200).send(user);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}

function deleteUser(req, res) {
  userService.deleteUser(req.params.id)
    .then(function () {
      res.sendStatus(200);
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}


