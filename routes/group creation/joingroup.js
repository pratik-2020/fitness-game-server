const groupModel = require('../../model/group');

const joinGroup = (req, res) => {
    const grpid = req.body.grpid;
    const user = req.body.user;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        if(response.length === 0){
            console.log('Wel1');
            res.send('Group does not exist!!');
        }
        else if(response[0].users.length == 4){
            console.log('Wel2');
            res.send('Group size limit is already finished!!');
        }
        else{
            console.log('Wel3')
            let f = [];
            response[0].users.map((e,key) => {
                f.push(e);
            });
            f.push([email,'No respond']);
            groupModel.updateOne({
                _id: response._id
            }, {
                _id: response[0]._id,
                grpid: req.body.grpid,
                users:f,
                currentLevel: response[0].currentLevel,
                admin:response[0].admin,
                weekGoal:response[0].weekGoal,
                points:response[0].points,
                stat:response[0].stat,
                steps:response[0].steps,
                session:response[0].session,
            }).then((resp) => {
                res.send('USer successfully joined the group!!');
            }).catch((er) => {
                res.send(er);
            });
        }
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
}
//pratikthakur2019@gmail.com181660786576795

module.exports = joinGroup;