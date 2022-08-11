const mongoose = require('mongoose');

const groupModel = require('../../model/group');
const groupsessionModel = require('../../model/gamesession');
const createGroup = (req, res) => {
    const email = req.body.email;
    const users = [email];
    const grpid = ""+ email + new Date().getDate() + new Date().getTime();
    let groupm = new groupModel();
    groupm.users = users;
    groupm.grpid = grpid;
    groupm.currentLevel = "0";
    groupm.admin = email;
    groupm.weekGoal = req.body.goal;
    groupm.stat = "A";
    groupm.session = "b";
    groupm.points = 0;
    groupm.steps= "0";
    groupm.save((err, data) => {
        if(err){
            res.send('Error occoured');
        }
        else{
            let gamem = new groupsessionModel();
            gamem.grpid = grpid;
            gamem.week_start_date = new Date().getDate();
            gamem.week_goal = "5000";
            gamem.total_achieved_steps=0;
            gamem.total_points=0;
            individual_contribution=[];
            gamem.current_checkpoint="0";
            gamem.save((er, dt) => {
                if(er){
                    res.send("Error");
                }
                else{
                    groupsessionModel.find({
                        grpid: grpid
                    }).then((rep) => {
                        groupModel.find({
                            grpid:grpid
                        }).then((rep1) => {
                            groupModel.updateOne({
                                grpid: grpid
                            }, {
                                _id: rep1._id,
                                users: rep1.users,
                                grpid:grpid,
                                currentLevel:rep1.currentLevel,
                                admin:rep1.admin,
                                weekGoal:rep1.weekGoal,
                                stat:rep1.stat,
                                session:""+rep._id,
                                points:0,
                                steps:"0"
                            }).then((rep2) => {
                                res.send({grpid});
                            }).catch((err) => {
                                res.send(err.message);
                            })
                        }).catch((err1) => {
                            res.send(err1.message);
                        })
                    }).catch((err2) => {
                        res.send(err2.message);
                    })
                }
            })
        }
    })
}


module.exports = createGroup;