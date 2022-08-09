const userModel = require('../../model/user');

const retUserData = (req, res) => {
    const email = req.body.email;
    userModel.find({
        email: email
    }).then((response) => {
        if(response.length === 0){
            res.send('User does not exist');
        }
        else{
            res.send(response);
        }
    }).catch((err) => {
        res.send(err.message);
    });
}

module.exports = retUserData;