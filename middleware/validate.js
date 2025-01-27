const validator = require('../helpers/validate');

const saveCertificate = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    outcomes: 'required|list',
    employment: 'required|string',
    requirements: 'required|list',
    status: 'required|string',
    credits: 'required|integer',
    courses: 'required|list'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveCertificate
};
