const gameSessionModel = require('../../model/gamesession');

const creategamesession = (req, res) => {
    const grpid = req.body.grpid;
    const week_goal = req.body.week_goal;
    const week_start_date = req.body.week;
    const total_achieved_steps = req.body.total_achieved_steps;
    const total_points = req.body.total_points;
    const current_checkpoint = req.body.current_checkpoint;
    const individual_contribution = req.body.individual_contribution;
    gameSessionModel.deleteOne({
        grpid: grpid
    }).then((response) => {
        let gamesessionm = new gameSessionModel();
        gamesessionm.grpid = grpid;
        gamesessionm.week_start_date = week_start_date;
        gamesessionm.total_achieved_steps = total_achieved_steps;
        gamesessionm.total_points = total_points;
        gamesessionm.individual_contribution = individual_contribution;
        gamesessionm.week_goal = week_goal;
        gamesessionm.current_checkpoint = current_checkpoint;
        gamesessionm.save((err, data) => {
            if(err){
                res.send(err);
            }
            else{
                res.send('Game Session created!!!');
            }
        })
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = creategamesession;