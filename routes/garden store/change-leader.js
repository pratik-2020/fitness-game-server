const groupModel = require('../../model/group');

const changeLeader = (req, res) => {
    const grpid = req.body.grpid;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        let g = response[0].users;
        let f = 0,i=0;
        g.map((e,key) => {
            if(e[0] === response[0].admin){
                f = i;
            }
            else{
                i = i + 1;
            }
        })
        let nm = response[0].users[( i + 1 )%(response[0].users.length)];
        groupModel.updateOne({
            grpid: grpid
        }, {
            _id: response[0]._id,
            users: response[0].users,
            currentLevel: response[0].currentLevel,
            grpid: grpid,
            admin: nm,
            weekGoal: response[0].weekGoal,
            points: response[0].points,
            stat: response[0].stat,
            steps: response[0].steps,
            session: response[0].session
        }).then((rep) => {
            res.send('Leader changed');
        }).catch((err) => {
            res.send(err);
        })
    })
}

module.exports = changeLeader;