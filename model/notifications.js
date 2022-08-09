const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    grpid: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        required: true
    }
});

const notificationModel  = mongoose.model('Notification', notificationSchema);

module.exports = notificationModel;