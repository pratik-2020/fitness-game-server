const userModel = require('../../model/user');

const adduser = (req, res) => {
    const name = req.body.name;
    const gender = req.body.gender;
    const usertype = req.body.usertype;
    const grpid = req.body.grpid;
    const password = req.body.password;
    const email = req.body.email;
    let userm = new userModel();
    userm.name = name;
    userm.gender = gender;
    userm.usertype = usertype;
    userm.grpid = grpid;
    userm.email = email;
    userm.password = password;
    userm.save((err, data) => {
        if(err){
            res.send(err);
        }
        else{
            res.send('User addedd successsfully!!');
        }
    })
}

module.exports = adduser;