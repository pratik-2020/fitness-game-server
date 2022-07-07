const groupModel = require('../../model/group');

const replyJoinRequest = (req, res) => {
    const grpid = req.body.grpid;
    const email = req.body.email;
    const reply = req.body.reply;

    groupModel.find({
        grpid: grpid
    }).then((response) => {
        response[0].users.map((e,key) => {
            if(e.email === email){
                e.reply = reply;
            }
        })
        if(response.length === 0){
            res.send('Group does not exist');
        }
        else{
            groupModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0].id,
                users: response[0].users,
                currentLevel : response[0].currentLevel,
                grpid: response[0].grpid,
                admin: response[0].admin
            }).then((rsp) => {
                res.send('Reply updated successfully');
            }).catch((er) => {
                res.send(er);
            })
        }
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = replyJoinRequest;