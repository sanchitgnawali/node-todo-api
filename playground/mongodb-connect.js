// const {MongoClient,ObjectID} = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

var url = 'mongodb://localhost:27017/sanchit';

var obj = new ObjectID();
console.log(obj);
// MongoClient.connect(url,(err,db) => {
//     if(err) {
//         return console.log('cant connect to the database');
//     }
//     var dbo = db.db("todo");
//     dbo.collection("TodoApp").insertOne({
//         text: 'Something to do',
//         completed: true
//     },(err,result)=>{
//         if(err) {
//             return console.log('Can not save into database',err);
//         }
//         console.log(JSON.stringify(result.ops,undefined,2));
//     })
   
   
//     db.close();
// })

MongoClient.connect(url,(err,db)=>{
    if(err) {return console.log('can\'t connect to the database')}
    console.log('connected to the database');
   
    var dbo = db.db('sanchit');

    dbo.collection('users').insertOne({name: 'hi',password:'hi'},(err,result)=>{
        if(err) throw Error('Error')
        console.log(JSON.stringify(result.ops,undefined,2));
    })

    db.close();
})