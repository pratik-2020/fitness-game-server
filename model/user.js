const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    grpid:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;