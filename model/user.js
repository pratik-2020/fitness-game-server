const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
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
    },
    goals: {
        type: Array,
        required: true
    },
    steps: {
        type: Number,
        required: true
    },
    point:{
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;