console.log("controllers degrees")

const mongo = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['degrees']
  console.log('here')
  try {
    mongo.getDatabase().db("project2").collection('degrees').find().toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['degrees']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact.');
  }
  const degreeId = new ObjectId(req.params.id);
  try { 
    mongo.getDatabase().db('project2').collection('degrees').find({ _id: degreeId }).toArray().then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    })
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createDegree = async (req, res) => {
  //#swagger.tags=['degrees']
  const degree = {
    title: req.body.title,
    outcomes: req.body.outcomes,
    employment: req.body.employment,
    requirements: req.body.requirements,
  };
  const response = await mongo.getDatabase().db("project2").collection('degrees').insertOne(degree);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const updateDegree = async (req, res) => {
  //#swagger.tags=['degrees']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact.');
  }

  const degreeId = new ObjectId(req.params.id);
  const degree = {
    title: req.body.title,
    outcomes: req.body.outcomes,
    employment: req.body.employment,
    requirements: req.body.requirements,
  };
  const response = await mongo
    .getDatabase()
    .db("project2")
    .collection('degrees')
    .replaceOne({ _id: degreeId }, degree);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

const deleteDegree = async (req, res) => {
  //#swagger.tags=['degrees']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact.');
  }

  const degreeId = new ObjectId(req.params.id);
  const response = await mongo
    .getDatabase()
    .db("project2")
    .collection('degrees')
    .deleteOne({ _id: degreeId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the user.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createDegree,
  updateDegree,
  deleteDegree
};
