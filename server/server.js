var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {ObjectId} = require('mongodb');

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

        res.send(todo)

    }).catch((e)=>{
        res.status(400).send();
    });    
});


app.listen(port,()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};