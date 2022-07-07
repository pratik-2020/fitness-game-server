const userModel = require('../../model/user');

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    userModel.find({
        email: email
    }).then((response) => {
        if(response.length === 0){
            res.send('User does not exist!!');
        }
        else if(response[0].password === password){
            res.send('User can proceed!!');
        }
        else if(response[0].password !== password){
            res.send('Invalid credentials');
        }
    })
}

module.exports = login;