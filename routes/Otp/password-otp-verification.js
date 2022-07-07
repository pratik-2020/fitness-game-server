const otpModel = require('../../model/otp');

const passChangeOtpVerification = (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    otpModel.find({
        email: email
    }).then((response) => {
        if(response.length === 0){
            res.send('User does not exist');
        }
        else if(response[0].otp === otp){
            res.send('USer may not exist');
        }
        else if(response[0].otp !== otp){
            res.send('Invalid otp');
        }
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = passChangeOtpVerification;