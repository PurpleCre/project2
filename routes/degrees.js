const routes = require('express').Router();
const degreesController = require('../controllers/degrees');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', degreesController.getAll);
routes.get('/:id', degreesController.getSingle);
routes.post('/', isAuthenticated, validation.saveDegree, degreesController.createDegree);
routes.put('/:id', isAuthenticated, validation.saveDegree, degreesController.updateDegree);
routes.delete('/:id', isAuthenticated, degreesController.deleteDegree);

module.exports = routes;
