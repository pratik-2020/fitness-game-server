const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true
    }
})

const tokenModel = mongoose.model('Token', tokenSchema);

module.exports = tokenModel;