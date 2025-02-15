const routes = require('express').Router();
const certificatesController = require('../controllers/certificates');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', certificatesController.getAll);
routes.get('/:id', certificatesController.getSingle);
routes.post('/', isAuthenticated, validation.saveCertificate, certificatesController.createCertificate);
routes.put('/:id', isAuthenticated, validation.saveCertificate, certificatesController.updateCertificate);
routes.delete('/:id', isAuthenticated, certificatesController.deleteCertificate);

module.exports = routes;
