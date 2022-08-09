const userModel = require('../../model/user');

const passUpdate = (req, res) => {
    const pass = req.body.pass;
    const email = req.body.email;
    userModel.find({
        email: email
    }).then((response) => {
        if(response.length === 0){
            res.send('User does not exist');
        }
        else if(response.length > 0){
            userModel.updateOne({
                email: email
            }, {
                email: email,
                password: pass,
                name: response[0].name,
                gender: response[0].grpid,
                usertype: response[0].usertype,
                grpid: response[0].grpid,
                _id: response[0]._id
            }).catch((er) => {
                res.send(er.message);
            })
        }
    }).catch((err) => {
        res.send(err.message);
    })
}

module.exports = passUpdate;