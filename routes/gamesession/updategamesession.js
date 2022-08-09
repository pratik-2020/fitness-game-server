const gameSessionModel = require('../../model/gamesession');

const updateGameSession = (req, res) => {
    const _id = req.body._id;
    gameSessionModel.updateOne({
        grpid: grpid,
    }, {
        grpid : req.body.grpid,
        week_goal : req.body.week_goal,
        week_start_date : req.body.week,
        total_achieved_steps : req.body.total_achieved_steps,
        total_points : req.body.total_points,
        current_checkpoint : req.body.current_checkpoint,
        individual_contribution : req.body.individual_contribution
    }).then((response) => {
        res.send('Game session updated successfully!!');
    }).catch((err) => {
        res.send(err);
    });
}
module.exports = updateGameSession;