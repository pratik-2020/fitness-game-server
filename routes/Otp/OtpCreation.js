const otpModel = require('../../model/otp');
const userModel = require('../../model/user');
const otpgen = require('otp-generator');
const nodemailer = require('nodemailer');
const otpCreation = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    userModel.find({
      email: email
    }).then((response) => {
      if(response.length > 0){
        res.send('User already exist');
      }
      else{
        const otp = otpgen.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        let otpm = new otpModel();
        otpm.user = name;
        otpm.email = email;
        otpm.password = password;
        otpm.otp = otp;
        otpm.save((err, data) => {
            if(err){
                res.send(err.message);
            }
            else{
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
            }
        })
      }
    })
}

module.exports = otpCreation;