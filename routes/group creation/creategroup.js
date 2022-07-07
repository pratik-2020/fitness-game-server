const mongoose = require('mongoose');

const groupModel = require('../../model/group');

const createGroup = (req, res) => {
    const email = req.body.email;
    const users = [email];
    const grpid = ""+ email + new Date().getDate() + new Date().getTime();
    let groupm = new groupModel();
    groupm.users = users;
    groupm.grpid = grpid;
    groupm.currentLevel = "0";
    groupm.save((err, data) => {
        if(err){
            res.send(err.message);
        }
        else{
            res.send('Group created successfully!!'+grpid);
        }
    })
}


module.exports = createGroup;