const mongoose = require('mongoose');

const finaldecisionSchema = mongoose.Schema({
    grpid: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true,
    },
    decision:{
        type: String,
        required: true
    },
    description:{
        type: String,
    }
})

const finaldecisionModel = mongoose.model('Finaldecision', finaldecisionSchema);

module.exports = finaldecisionModel;