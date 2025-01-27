console.log("controllers certificates")

const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['certificates']
  const result = await mongo.getDatabase().db("project2").collection('certificates').find();
  result.toArray().then((certificates) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(certificates);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['certificates']
  const certificateId = new ObjectId(req.params.id);
  const result = await mongo.getDatabase().db("project2").collection('certificates').find({ _id: certificateId });
  console.log(result);
  result.toArray().then((certificates) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(certificates[0]);
  });
};

const createCertificate = async (req, res) => {
  //#swagger.tags=['certificates']
  const certificate = {
    title: req.body.title,
    outcomes: req.body.outcomes,
    employment: req.body.employment,
    requirements: req.body.requirements,
    status: req.body.status,
    credits: req.body.credits,
    courses: req.body.courses
  };
  const response = await mongo.getDatabase().db("project2").collection('certificates').insertOne(certificate);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const updateCertificate = async (req, res) => {
  //#swagger.tags=['certificates']
  const certificateId = new ObjectId(req.params.id);
  const certificate = {
    title: req.body.title,
    outcomes: req.body.outcomes,
    employment: req.body.employment,
    requirements: req.body.requirements,
    status: req.body.status,
    credits: req.body.credits,
    courses: req.body.courses
  };
  const response = await mongo
    .getDatabase()
    .db("project2")
    .collection('certificates')
    .replaceOne({ _id: certificateId }, certificate);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const deleteCertificate = async (req, res) => {
  //#swagger.tags=['certificates']
  const certificateId = new ObjectId(req.params.id);
  const response = await mongo
    .getDatabase()
    .db("project2")
    .collection('certificates')
    .deleteOne({ _id: certificateId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createCertificate,
  updateCertificate,
  deleteCertificate
};
