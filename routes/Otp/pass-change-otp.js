const otpModel = require('../../model/otp');
const otpgen = require('otp-generator');
const nodemailer = require('nodemailer');
const passChange = (req, res) => {
    const email = req.body.email;
    const otp = otpgen(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

    otpModel.find({
        email: email
    }).then((response) => {
        if(response.length === 0){
            res.send('User does not exist');
        }
        else if(response.length === 1){
            otpModel.updateOne({
                email: email
            }, {
                user: response[0].user,
                email: email,
                _id: response[0]._id,
                password: response[0].password,
                otp: otp
            }).then((rsp) => {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'capture31122021@gmail.com',
                      pass: 'Capture@123'
                    }
                  });
                  
                  var mailOptions = {
                    from: 'capture31122021@gmail.com',
                    to: email,
                    subject: 'Otp for fitness app registration',
                    text: `Your otp for registration on fitness application is : ${otp}`
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      res.send(error);
                    } else {
                      res.send('Email is send to your email id.');
                    }
                  });
            }).catch((err) => {
                res.send(err);
            })
        }
    }).catch((er) => {
        res.send(er);
    })
}

module.exports = passChange;