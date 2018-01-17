const {MongoClient,ObjectID} = require('mongodb');
const url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url,(err,db)=>{
    if(err) return console.log('couldnt connect to the database');
    console.log('successfully connected to the database');

    const dbo = db.db('todo');

    // dbo.collection('TodoApp').updateOne({text: 'i dont know'},{
    //     $set: {
    //         text: 'i know'
    //     }
    // }).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log(err);
    // });

    // dbo.collection('TodoApp').findOneAndUpdate({
    //     _id: new ObjectID('5a5fb1b427227895eacf25d2')
    // },{
    //     $set: {
    //         completed: false
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result)=>{
    //     console.log(result);
    // })

//INsert into database
    // dbo.collection('Users').insertOne({
    //     name: 'Sanchit',
    //     username: 'sanchit',
    //     age: 20
    // }).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log("Error");
    // })

    dbo.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a5fc4623369fc01e6f9f4fa')
    },{
        $inc: {
            age:21
        }
    }).then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    })

});