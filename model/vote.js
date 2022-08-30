const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    vote: {
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    grpid: {
        type: String,
        required: true
    }
});

const voteModel = mongoose.model('Vote', voteSchema);

module.exports = voteModel;