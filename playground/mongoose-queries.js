const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = "6aa44a94b63d4760b9b2ffec";

var userId = "5a96667ec6305b08b8957d22";

// Todo.find({
//     _id: id
// }).then((doc)=>{
//     console.log('Todos : ',doc);
// })

// Todo.findOne({
//     _id: id
// }).then((doc)=>{
//     console.log('Todo: ',doc);
// })

// Todo.findById(id).then((todo)=>{
//     if(!todo) {
//         console.log("ID not found");

// } else  
//     console.log('Todos by id: ',todo);
// });

User.findOne({
    _id: userId

}).then((doc)=>{
    if(doc)
        console.log("User Document: ",doc);
    else 
        console.log("No user found.")
}).catch((e)=> console.log(e));