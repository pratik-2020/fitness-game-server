const groupModel = require('../../model/group');
const gamesessionModel = require('../../model/gamesession');
const setCustom = (req, res) => {
    const grpid = req.body.grpid;
    const cust = req.body.cust;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        let gamem = new gamesessionModel();
        gamem.grpid = grpid
        gamem.week_start_date = new Date().getDate();
        gamem.week_goal = cust;
        gamem.total_achieved_steps = 0;
        gamem.total_points = 0;
        gamem.individual_contribution = [];
        gamem.current_checkpoint = '' + (parseInt(response[0].currentLevel) + 1);
        gamem.save((err, data) => {
            if(err){
                res.send(err);
            }
            else{
                gamesessionModel.find({
                    grpid:grpid,
                    current_checkpoint: ''+(parseInt(response[0].currentLevel) + 1)
                }).then((rep1) => {
                    groupModel.updateOne({
                        grpid: grpid
                    }, {
                        _id: response[0]._id,
                        users: response[0].users,
                        currentLevel: response[0].currentLevel,
                        grpid: grpid,
                        admin: response[0].admin,
                        weekGoal:cust,
                        points: response[0].points,
                        stat: response[0].stat,
                        steps: 0,
                        session: rep1[0]._id
                    }).then((rep) => {
                        res.send('Custom goal set');
                    }).catch((er) => {
                        res.send(er);
                    })
                })
            }
        })
    })

}



module.exports = setCustom;