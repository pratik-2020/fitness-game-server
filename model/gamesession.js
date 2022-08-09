const mongoose = require('mongoose');

const gamesessionSchema = mongoose.Schema({
    grpid: {
        type: String,
        reqquired: true
    },
    week_start_date: {
        type: Date,
        required: true
    },
    week_goal: {
        type: String,
        required: true
    },
    total_achieved_steps: {
        type: Number,
        required: true,
    },
    total_points: {
        type: Number,
        required: true
    },
    individual_contribution: {
        type: Array,
        required: true
    },
    current_checkpoint: {
        type: String,
        required: true
    }
});

const gameSessionModel = mongoose.model('GameSession', gamesessionSchema);

module.exports = gameSessionModel;