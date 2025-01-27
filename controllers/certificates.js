console.log("controllers certificates")

const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['certificates']
  console.log('here')
  try {
    mongo.getDatabase().db("project2").collection('certificates').find().toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['certificates']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const certificateId = new ObjectId(req.params.id);
  try { 
    mongo.getDatabase().db('project2').collection('certificates').find({ _id: certificateId }).toArray().then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    })
  } catch (err) {
    res.status(400).json({ message: err });
  }
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
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const updateCertificate = async (req, res) => {
  //#swagger.tags=['certificates']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }

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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }

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
