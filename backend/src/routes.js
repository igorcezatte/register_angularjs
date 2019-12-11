const { Router } = require('express');

const UserController = require('./app/controllers/UserController');

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ message: 'This is the challenge number 2 from adsoft' })
);

routes.get('/users/:fEmail', UserController.findOne);
routes.get('/users', UserController.findAll);
routes.post('/users', UserController.store);

module.exports = routes;
