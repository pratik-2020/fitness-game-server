const gameSessionModel = require('../../model/gamesession');

const updateGameSession = (req, res) => {
    const _id = req.body._id;
    gameSessionModel.updateOne({
        _id: _id
    }, {
        name: req.body.name,
        _id: _id,
        userid: req.body.userid,
        usertype: req.body.usertype._id,
        que1: req.body.que1
    }).then((response) => {
        res.send('Game session updated successfully!!');
    }).catch((err) => {
        res.send(err);
    });
}
module.exports = updateGameSession;