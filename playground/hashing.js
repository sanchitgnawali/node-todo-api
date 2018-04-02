const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10,
    name: 'sanchit',
}
var access = 'auth';

var token = jwt.sign({id:data.id,name: data.name,access},'12345sanchit').toString();
console.log(token);

var decoded = jwt.decode(token,'12345sanchit');
console.log(decoded);

// const message = "I am number 3";

// const hash = SHA256(message).toString();

// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`);

// var data = {
//     id: 3,
//     name: "sanchit"
// }
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+"somesaltingvalue").toString()
// }

// var resultHash = SHA256(JSON.stringify(data)+"somesaltingvalue1").toString();

// if(resultHash === token.hash) {
//     console.log("data has not been changed");
// } else {
//     console.log('data has been changed');
// }

