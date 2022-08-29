const earntrophyModel = require('../../model/earnatrophy');
const groupModel = require('../../model/group');
const gamesessionModel = require('../../model/gamesession');
const addTrophy = (req, res) => {
    const grpid = req.body.grpid;
    const trophy = req.body.trophy;
    const point = req.body.point;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        let earnm = new earntrophyModel();
        earnm.grpid = grpid;
        earnm.trophy = trophy;
        earnm.point = point;
        earnm.level = response[0].currentLevel;
        earnm.achieved = 'No';
        earnm.save((err, data) => {
            if(err){
                res.send(err);
            }
            else{
                let gamem = new gamesessionModel();
                gamem.grpid = grpid;
                gamem.week_start_date = new Date().getDate();
                gamem.week_goal = point;
                gamem.total_achieved_steps = 0
                gamem.total_points = 0
                gamem.individual_contribution = [];
                gamem.current_checkpoint = response[0].currentLevel;
                gamem.save((er, dt) => {
                    if(er){
                        res.send(er);
                    }
                    else{
                        gamesessionModel.find({
                            grpid: grpid,
                            current_checkpoint: response[0].currentLevel
                        }).then((re) => {
                             groupModel.updateOne({
                                grpid: grpid
                            }, {
                                _id: response[0]._id,
                                users: response[0].users,
                                currentLevel: response[0].currentLevel,
                                grpid: grpid,
                                admin: response[0].admin,
                                weekGoal: point,
                                points: 0,
                                stat: response[0].stat,
                                steps: 0,
                                session: re[0]._id
                            }).then((rep) => {
                                res.send('Data updated');
                            }).catch((er) => {
                                res.send(er);
                            })
                        }).catch((e) => {
                            res.send(e);
                        })
                    }
                })
                res.send('Trophy added');
            }
        })
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = addTrophy;