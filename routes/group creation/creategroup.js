// const mongoose = require('mongoose');

// const groupModel = require('../../model/group');
// const groupsessionModel = require('../../model/gamesession');
// const createGroup = (req, res) => {
//     const email = req.body.email;
//     const users = [email];
//     const grpid = ""+ email + new Date().getDate() + new Date().getTime();
//     let groupm = new groupModel();
//     groupm.users = users;
//     groupm.grpid = grpid;
//     groupm.currentLevel = "0";
//     groupm.admin = email;
//     groupm.weekGoal = req.body.goal;
//     groupm.stat = "A";
//     groupm.session = "b";
//     groupm.points = 0;
//     groupm.steps= "0";
//     groupm.save((err, data) => {
//         if(err){
//             res.send('Error occoured');
//         }
//         else{
//             let gamem = new groupsessionModel();
//             gamem.grpid = grpid;
//             gamem.week_start_date = new Date().getDate();
//             gamem.week_goal = "5000";
//             gamem.total_achieved_steps=0;
//             gamem.total_points=0;
//             individual_contribution=[];
//             gamem.current_checkpoint="0";
//             gamem.save((er, dt) => {
//                 if(er){
//                     res.send("Error");
//                 }
//                 else{
//                     groupsessionModel.find({
//                         grpid: grpid
//                     }).then((rep) => {
//                         groupModel.find({
//                             grpid:grpid
//                         }).then((rep1) => {
//                             groupModel.updateOne({
//                                 grpid: grpid
//                             }, {
//                                 _id: rep1._id,
//                                 users: rep1.users,
//                                 grpid:grpid,
//                                 currentLevel:rep1.currentLevel,
//                                 admin:rep1.admin,
//                                 weekGoal:rep1.weekGoal,
//                                 stat:rep1.stat,
//                                 session:""+rep._id,
//                                 points:0,
//                                 steps:"0"
//                             }).then((rep2) => {
//                                 res.send({grpid});
//                             }).catch((err) => {
//                                 res.send(err.message);
//                             })
//                         }).catch((err1) => {
//                             res.send(err1.message);
//                         })
//                     }).catch((err2) => {
//                         res.send(err2.message);
//                     })
//                 }
//             })
//         }
//     })
// }


// module.exports = createGroup;
const groupModel = require('../../model/group');
const gamesessionModel = require('../../model/gamesession');

const createGroup = (req, res) => {
    const email = req.body.email;
    const users = [[email, 'Accepted']];
    const grpid = ""+ email + new Date().getDate() + new Date().getTime();
    let groupm = new groupModel();
    groupm.users = users;
    groupm.currentLevel = "0";
    groupm.grpid = grpid;
    groupm.admin = email;
    groupm.weekGoal = req.body.goal;
    groupm.points = 0;
    groupm.stat = "A";
    groupm.steps = "0";
    groupm.session = "b";
    groupm.save((err, data) => {
        if(err){
            res.send("Error 1");
        }
        else{
            let gamem = new gamesessionModel();
            gamem.grpid = grpid;
            gamem.week_start_date = new Date().getDate();
            gamem.week_goal = req.body.goal;
            gamem.total_achieved_steps = 0;
            gamem.total_points = 0;
            gamem.individual_contribution = [];
            gamem.current_checkpoint = "0";
            gamem.save((er, dt) => {
                if(er){
                    res.send('Error 2');
                }
                else{
                    gamesessionModel.find({
                        grpid: grpid
                    }).then((response) => {
                        groupModel.find({
                            grpid: grpid
                        }).then((rep) => {
                            groupModel.updateOne({
                                grpid: grpid
                            }, {
                                _id: rep._id,
                                users: rep.users,
                                currentLevel: rep.currentLevel,
                                grpid: rep.grpid,
                                admin:email,
                                weekGoal:rep.weekGoal,
                                points:rep.points,
                                stat: rep.stat,
                                steps:rep.steps,
                                session: response._id
                            }).then((rep1) => {
                                res.send({grpid});
                            }).catch((err) => {
                                res.send(err);
                            })
                        }).catch((err2) => {
                            res.send(err2);
                        })
                    }).catch((err3) => {
                        res.send(err3);
                    })
                }
            })
        }
    })
}

module.exports = createGroup;