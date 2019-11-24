const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) =>
  res.json({ message: 'This is the challenge number 2 from adsoft' })
);

module.exports = routes;
