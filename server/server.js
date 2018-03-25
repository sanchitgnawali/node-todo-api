var env = process.env.NODE_ENV || 'development';
console.log('env*******',env);

if(env === 'development') {
    
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todo';

} else if(env=== 'test') {
    
    process.env.PORT=3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/todoTest'
}

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectId} = require('mongodb');

var app = express();
app.use(bodyParser());

const port = process.env.PORT || 3000;

//make a post request sending the data
app.post('/todos',(req,res)=>{
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

//getting all the todo
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

//get request with a parameter
app.get('/todos/:id',(req,res)=>{
   
    var id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send("Invalid id");
    } 
    Todo.findById(id).then((todo)=>{
        if(!todo) {
            return res.status(404).send();
        }   
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

// Deleting a doc
app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;

    if(!ObjectId.isValid(id)) {
        return res.status(404).send("Invalid id");
    }

    Todo.findByIdAndRemove(id).then((todo)=> {
        
        if(!todo) {
            return res.status(404).send();
        }

        res.send({todo})

    }).catch((e)=>{
        res.status(400).send();
    });    
});


//updating a doc
app.path('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }
})

//updating a collection
app.patch('/todos/:id',(req,res)=>{

    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);

    if(!ObjectId.isValid(id)) {
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo) {
            return res.status(404).send();
        }
            return res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};