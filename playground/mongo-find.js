const {MongoClient,ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/todo';

MongoClient.connect(url,(err,db)=>{
    if(err) return console.log('Cant connect the database');
    console.log('connected to the database')

    var dbo = db.db('todo');
   
    // dbo.collection('TodoApp').find({
    //     _id: new ObjectID('5a5f8ce6813d70f99fdc7e65')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     // console.log(JSON.stringify(docs,undefined,2));
    //     console.log(docs);
    // },(err)=>{
    //     console.log('Cannot fetch data from database');
    // });

    dbo.collection('TodoApp').find().count().then((count)=>{
        console.log(`TODOS COUNT: ${count}`);
    },(err)=>{
        console.log(err);
    })
});