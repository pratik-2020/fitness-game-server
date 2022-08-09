const userModel = require('../../model/user');

const adduser = (req, res) => {
    const name = req.body.name;
    const usertype = req.body.usertype;
    const grpid = req.body.grpid;
    const password = req.body.password;
    const email = req.body.email;
    const steps = 0;
    let userm = new userModel();
    userm.name = name;
    userm.usertype = usertype;
    userm.grpid = grpid;
    userm.email = email;
    userm.password = password;
    userm.steps = steps;
    userm.goals = [];
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