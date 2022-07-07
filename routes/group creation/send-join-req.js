const groupModel = require('../../model/group');

const sendJoinReq = (req, res) => {
    const grpid = req.body.grpid;
    const email = req.body.email;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        if(response.length === 0){
            res.send('Group does not exist');
        }
        else{
            let ar = []
            response[0].users.map((e,key) => {
                ar.push(e);
            })
            ar.push({
                email: email,
                status: "Not accepted"
            });
            groupModel.updateOne({
                grpid: grpid
            }, {
                users: ar,
                _id : response[0]._id,
                grpid: grpid,
                currentlevel: response[0].currentlevel
            }).then(rsp => {
                res.send('Request Send');
            }).catch((er) => {
                res.send(er);
            })
        }
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = sendJoinReq;