var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: (value)=> {
                return validator.isEmail(value);
            },
            message: '{VALUE} is incorrect email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


userSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{access,token}]);
    
    // user.tokens.push({access:access,token:token});
    // user.tokens = user.tokens.concat([{access,token}]);
    
    
    return user.save().then(() => {
        return token;
    });
};

userSchema.methods.toJSON = function() {
    var user = this;

    var userObject = user.toObject();
    return _.pick(userObject,['email','password']);
}

userSchema.statics.findByToken = function(token) {
    var decoded;
    
    try {
        decoded = jwt.verify(token,'abc123');
    } catch(e) {
        
        /************************ */
        // return new Promise((resolve,reject)=>{
        //     reject();
        // })
        /*************************/

        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

var User = mongoose.model('User',userSchema);

module.exports = {
    User
}