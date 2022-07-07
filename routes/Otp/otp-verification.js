const otpModel = require('../../model/otp');

const otpVerification = (req,res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    otpModel.find({
        email: email
    }).then((response) => {
        if(response[0].otp === otp){
            res.send('User can proceed!!');
        }
        else{
            res.send('Invalid otp!!');
        }
    })
}

module.exports = otpVerification;