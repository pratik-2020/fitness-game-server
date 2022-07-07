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
    }
});

const groupModel = mongoose.model('Group', groupSchema);

module.exports = groupModel;