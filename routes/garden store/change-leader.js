const groupModel = require('../../model/group');

const changeLeader = (req, res) => {
    const grpid = req.body.grpid;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        let g = response[0].users;
        let f = 0,i=0, d = [];
        g.map((e,key) => {
            if(e[1] === 'Accepted'){
                d.push(e[0]);
            }
        })
        let a = d.indexOf(response[0].admin);
        let nm = "";
        if(a === d.length -1){
            nm = d[0];
        }
        else{
            nm = d[a+1];
        }
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