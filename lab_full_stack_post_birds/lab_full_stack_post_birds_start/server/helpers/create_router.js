const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  //gets all information
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //gets 1 item in data 
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .findOne({ _id: ObjectID(id) })
      .then((doc) => res.json(doc))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //add 1 item - NEW
  router.post('/',(req,res) => {
  const newSighting = req.body
  collection.insertOne(newSighting)
  .then(dataBaseResponse => res.json(dataBaseResponse.ops[0]))
  .catch((err) => {
    console.error(err);
    res.status(500);
    res.json({ status: 500, error: err });
  });
  })

  //(extention) remove 1 item - NEW
  router.delete('/:id',(req,res) => {
    const id = req.params.id
    collection.deleteOne({_id: ObjectID(id)})
    .then(result => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.json({ status: 500, error: err });
    });
  })
  return router;
};

module.exports = createRouter;
