use zoo;

db.dropDatabase()

db.animals.insertMany([
    {name:"Jane",
     type:"Polar Bear"
    },
    {name:"Norman",
     type:"Penguin",
     age:5
    },
    {name:"Mel",
     type:"Otter"
    },
    {name:"Bane",
     type:"Bat"
    },
    {name:"Gustav",
     type:"Bear"
    },
    {name:"Imposter",
     type:"Rock"
    }

])

db.animals.find({_id:ObjectId("6475da6c470c85561a3c4773")})
db.animals.find({name:"Bane"})
db.animals.find({type:"Bear"})

db.animals.updateOne({name:"Imposter"},{ $set: {name:"Mel",age:15}})

db.animals.deleteOne({name:"Imposter"})