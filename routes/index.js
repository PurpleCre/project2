const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.get('/', (req, res) => {
  // swagger.tags=['Hello World']
  res.send('Hello World');
});

routes.use('/certificates', require('./certificates'));
routes.use('/degrees', require('./degrees'));

module.exports = routes;
