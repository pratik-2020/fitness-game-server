const groupModel = require('../../model/group');
const userModel = require('../../model/user');
const gamesessionModel = require('../../model/gamesession');
const earnatrophy = require('../../model/earnatrophy');
const updateStepsPoints = (req, res) => {
    const email = req.body.email;
    const grpid = req.body.grpid;
    const steps = req.body.steps;
    const points = req.body.points;

    groupModel.find({
        grpid: grpid
    }).then((resp1) => {
        let crt = parseInt(resp1[0].currentLevel);
        if(resp1[0].steps + steps >= resp1[0].weekGoal){
            crt = crt + 1;
        }
        groupModel.updateOne({
            grpid:grpid
        }, {
            _id: resp1[0]._id,
            users: resp1[0].users,
            currentLevel: (""+crt),
            grpid:grpid,
            admin:resp1[0].admin,
            weekGoal: resp1[0].weekGoal,
            points:(parseInt(""+resp1[0].points)+parseInt(""+points)),
            stat: resp1[0].stat,
            steps: ""+(parseInt(resp1[0].steps) + parseInt(""+steps)),
            session: resp1[0].session
        }).then((resp2) => {
            gamesessionModel.find({
                grpid:grpid,
                current_checkpoint:resp1[0].currentLevel
            }).then((resp3) => {
                gamesessionModel.updateOne({
                    grpid: grpid,
                    current_checkpoint:resp1[0].currentLevel
                }, {
                    _id:resp3[0]._id,
                    grpid: grpid,
                    week_start_date:resp3[0].week_start_date,
                    week_goal: resp3[0].week_goal,
                    total_achieved_steps:(parseInt(""+resp3[0].total_achieved_steps)+parseInt(""+steps)),
                    total_points:(parseInt(""+resp3[0].total_points)+parseInt(""+points)),
                    individual_contribution:resp3[0].individual_contribution,
                    current_checkpoint:(""+crt)
                }).then((resp4) => {
                    userModel.find({
                        email:email
                    }).then((resp5) => {
                        console.log('resp5');
                        console.log(resp5);
                        userModel.updateOne({
                            email:email
                        }, {
                            _id: resp5[0]._id,
                            name: resp5[0].name,
                            usertype: resp5[0].usertype,
                            grpid:grpid,
                            password:resp5[0].password,
                            email:email,
                            goals:resp5[0].goals,
                            steps:(parseInt(""+resp5[0].steps) + parseInt(""+steps)),
                            point: ""+(parseInt(resp5[0].point) + parseInt(""+points))
                        }).then((resp6) => {
                            earnatrophy.find({
                                grpid:grpid,
                                level:resp1[0].currentLevel
                            }).then((resp7) => {
                                if(resp7.length > 0 &&  parseInt(resp7[0].point) <= steps){
                                    earnatrophy.updateOne({
                                        grpid:grpid,
                                        level:resp1[0].currentLevel
                                    },{
                                        _id:resp7[0]._id,
                                        level:resp1[0].currentLevel,
                                        achieved:'Yes',
                                        point:resp7[0].point,
                                        trophy:resp7[0].trophy,
                                        grpid:grpid
                                    }).then((resp8) => {
                                        res.send('Data updated and trophy acieved');
                                    }).catch((er8) => {
                                        res.send(er8);
                                    })
                                }
                                else{
                                    res.send('Data updated');
                                }
                            }).catch((er7) => {
                                console.log('Hel7');
                                console.log(er7);
                                res.send(er7);
                            })
                        }).catch((er6) => {
                            console.log('Hel6');
                            console.log(er6);
                            res.send(er6);
                        })
                    }).catch((er5) => {
                        console.log('Hel5');
                        console.log(er5);
                        res.send(er5);
                    })
                }).catch((er4) => {
                    console.log('Hel4');
                    console.log(er4);
                    res.send(er4);
                })
            }).catch((er3) => {
                console.log('Hel3');
                console.log(er3);
                res.send(er3);
            })
        }).catch((er2) => {
            console.log('Hel2');
            console.log(er2);
            res.send(er2);
        })
    }).catch((er1) => {
        console.log('Hel1');
        console.log(er1);
        res.send(er1);
    })
}

module.exports = updateStepsPoints;