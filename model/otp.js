const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const otpModel = mongoose.model('OTP', otpSchema);

module.exports = otpModel;