const mongoose = require('mongoose');

const gamesessionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    que1: {
        type: String,
        required: false
    }
});

const gameSessionModel = mongoose.model('GameSession', gamesessionSchema);

module.exports = gameSessionModel;