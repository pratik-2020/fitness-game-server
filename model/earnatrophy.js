const mongoose = require('mongoose');

const earntrophySchema = mongoose.Schema({
    grpid: {
        type: String,
        required: true
    },
    trophy: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    achieved:{
        type: String,
        required: true
    },
    point: {
        type: String,
        required: true,
    }
});

const earntrophyModel = mongoose.model('Earnatrophy', earntrophySchema);

module.exports = earntrophyModel;