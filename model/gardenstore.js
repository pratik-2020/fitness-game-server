const mongoose = require('mongoose');

const gardenstoreSchema = mongoose.Schema({
    grpid: {
        type: String,
        required: true
    },
    seed: {
        type: Number,
        required: true
    },
    house:{
        type: Number,
        required:true
    },
    smallplant: {
        type: Number,
        required: true
    },
    mediumplant: {
        type: Number,
        required: true
    },
    largeplant: {
        type: Number,
        required: true
    },
    weedkiller: {
        type: Number,
        required: true
    },
    sodroller: {
        type: Number,
        required: true
    },
    tree: {
        type: Number,
        required: true
    },
    bag: {
        type: Number,
        required: true
    },
    flower: {
        type: Number,
        required: true
    }
})

const gardenstoreModel = mongoose.model('Gardenstore', gardenstoreSchema);

module.exports = gardenstoreModel;