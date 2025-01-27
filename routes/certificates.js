const routes = require('express').Router();
const certificatesController = require('../controllers/certificates');

routes.get('/', certificatesController.getAll);
routes.get('/:id', certificatesController.getSingle);
routes.post('/', certificatesController.createCertificate);
routes.put('/:id', certificatesController.updateCertificate);
routes.delete('/:id', certificatesController.deleteCertificate);

module.exports = routes;
