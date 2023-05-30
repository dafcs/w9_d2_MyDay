const express = require('express');
const ObjectID = require('mongodb').ObjectID

const createRouter = function (collection) {
 
  const router = express.Router();

  router.get("/",(request,response) => {
    collection
    .find()
    .toArray()
    .then((documents)=> response.json(documents))
    //to force an error we can change ^ to response.nonsense(documents)
    .catch((err) => {
      console.error(err)
      response.status(500)
      response.json({status:500,error:err})
    })
  })

  router.get('/:id',(request,response) => {
    const id = request.params.id;
    collection.findOne({_id:ObjectID(id)})
    .then(document=> response.json(document))
    .catch((err) => {
      console.error(err)
      response.status(500)
      response.json({status:500,error:err})
    })
  })
      // response.send("code works") - works as print

    router.post('/',(request,response) => {
      const newGameData = request.body

      collection
      .insertOne(newGameData)
      // .then(()=>collection.find().toArray()) // sends back a confirmation by id
      .then(dataBaseResponse => response.json(dataBaseResponse.ops[0])) //ops[0] is returning the object we just logged by ID, newer versions will be .insertedID instead of .ops
      // .then(documents => response.json(documents)) //returns all the games back
      
      .catch((err) => {
        console.error(err)
        response.status(500)
        response.json({status:500,error:err})
      })})

    router.delete('/:id',(request,response) => {
      const id = request.params.id 
      collection.deleteOne({_id: ObjectID(id)})
      .then(result => response.json(result))
      .catch((err) => {
        console.error(err)
        response.status(500)
        response.json({status:500,error:err})
      })})


    router.put("/:id",(request,response) => {
      const id = request.params.id
      const updateData = request.body
      collection.updateOne({_id:ObjectID(id)},{$set: updateData})
      .then(result => response.json(result))
      .catch((err) => {
        console.error(err)
        response.status(500)
        response.json({status:500,error:err})
      })})

  return router;

};

module.exports = createRouter;
