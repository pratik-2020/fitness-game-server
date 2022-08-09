const groupModel = require('../../model/group');

const joinGroup = (req, res) => {
    const grpid = req.body.grpid;
    const user = req.body.user;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        if(response.length === 0){
            res.send('Group does not exist!!');
        }
        else if(response[0].users.length == 4){
            res.send('Group size limit is already finished!!');
        }
        else{
            response.users = [...response.users,user];
            groupModel.updateOne({
                _id: response._id
            }, response).then((resp) => {
                res.send('USer successfully joined the group!!');
            }).catch((er) => {
                res.send(er.message);
            });
        }
    }).catch(err => {
        res.send(err.message);
    })
}

module.exports = joinGroup;