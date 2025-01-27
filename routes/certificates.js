const routes = require('express').Router();
const certificatesController = require('../controllers/certificates');
const validation = require('../middleware/validate');

routes.get('/', certificatesController.getAll);
routes.get('/:id', certificatesController.getSingle);
routes.post('/', validation.saveCertificate, certificatesController.createCertificate);
routes.put('/:id', validation.saveCertificate, certificatesController.updateCertificate);
routes.delete('/:id', certificatesController.deleteCertificate);

module.exports = routes;
