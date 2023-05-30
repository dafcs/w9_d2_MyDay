const express = require('express');
const app = express();
//use express
const MongoClient = require('mongodb').MongoClient;
//makes connection between MongoDB and Express
const createRouter = require('./helpers/create_router')

app.use(express.json());
//parse json data

MongoClient.connect("mongodb://127.0.0.1:27017",{useUnifiedTopology:true}).then((client) => {
  const db = client.db('games_hub')
  //if such db does not exist then one will be created
  const gamesCollection = db.collection('games')
  const gamesRouter = createRouter(gamesCollection)
  app.use("/api/games",gamesRouter)


}).catch(console.error)
app.listen(9000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});

