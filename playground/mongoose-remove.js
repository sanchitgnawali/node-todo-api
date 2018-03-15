const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((doc)=>{
//     console.log(doc);
// });

Todo.findByIdAndRemove('5aa6c38dced8e67323fa4aa7').then((doc)=>{
    console.log(doc);
});