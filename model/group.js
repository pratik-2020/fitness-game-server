const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    users: {
        type: Array,
        required: true
    },
    currentLevel : {
        type: String,
        required: true,
    },
    grpid: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    weekGoal: {
        type: Array,
        required: true
    },
    points: {
        type: Number, 
        required: true
    },
    stat: {
        type: String,
        required: true
    },
    steps: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    }
});

const groupModel = mongoose.model('Group', groupSchema);

module.exports = groupModel;