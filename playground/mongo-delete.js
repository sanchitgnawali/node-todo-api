const {MongoClient} = require('mongodb');

url = "mongodb://localhost:27017/todo";

MongoClient.connect(url,(err,db)=>{
    if (err) throw Error('Unable to connect to the database');

    const dbo = db.db('todo');
    
    //delete many
    // dbo.collection('TodoApp').deleteMany({text: "1"}).then((result)=>{
    //     console.log(result);
    // },(err)=>{
    //     console.log('unable to delete items');
    // });

    //delete one
    // dbo.collection('TodoApp').deleteOne({text: "Something to do"}).then((result)=>{
    //     console.log(result);
    // },(err)=>{  
    //     return console.log(err);
    // })

    // findAndDeleteOne
    dbo.collection('TodoApp').findOneAndDelete({text: "Something to do"}).then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    })
});