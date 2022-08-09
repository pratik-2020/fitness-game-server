const groupModle = require('../../model/group');

const setGroupAdmin = (req, res) => {
    const username = req.body.username;
    const votername = req.body.votername;
    const grpid = req.body.grpid;
    groupModle.find({
        grpid: grpid
    }).then((response) => {
        if(response.length === 0){
            res.send('Group does not exist');
        }
        else{
            response[0].vote.push({
                votername: username
            });
            groupModle.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: response[0].grpid,
                vote: response[0].vote,
                users: response[0].users,
                currentlevel: response[0].currentlevel,
                admin: response[0].admin
            }).then((resp) => {
                res.send('Vote added successfully!!');
            }).catch((er) => {
                res.send(er);
            })
        }
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = setGroupAdmin;