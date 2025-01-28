const validator = require('../helpers/validate');

// validate certificate data
const saveCertificate = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    outcomes: 'required',
    employment: 'required',
    requirements: 'required',
    status: 'required|string',
    credits: 'required',
    courses: 'required'
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
// validate degrees
const saveDegree = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    outcomes: 'required',
    employment: 'required',
    requirements: 'required'
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
  saveCertificate,
  saveDegree
};
