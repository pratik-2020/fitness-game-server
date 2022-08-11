const otpModel = require('../../model/otp');

const otpVerification = (req,res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    otpModel.find({
        email: email
    }).then((response) => {
        console.log(response);
        if(response.otp === otp){
            res.send('User can proceed!!');
        }
        else{
            res.send(response.otp);
        }
    }).catch(err => {
        res.send(err);
    }) 
}

module.exports = otpVerification;