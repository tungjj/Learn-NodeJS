const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'task-manager'

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,}, (error, client) =>{
    if(error) {
        return console.log("Can not connect to db")
    }

    console.log("Connect successfully")
    
    const db = client.db(dbName)
    // db.collection('user').insertOne({
    //     name: 'Tung',
    //     age: 13
    // })
    // db.collection('user').find({ name: 'Tung'}).toArray((error, task)=>{
    //     console.log(task)
    // })
})