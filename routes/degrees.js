const routes = require('express').Router();
const degreesController = require('../controllers/degrees');
const validation = require('../middleware/validate');

routes.get('/', degreesController.getAll);
routes.get('/:id', degreesController.getSingle);
routes.post('/', validation.saveDegree, degreesController.createDegree);
routes.put('/:id', validation.saveDegree, degreesController.updateDegree);
routes.delete('/:id', degreesController.deleteDegree);

module.exports = routes;
