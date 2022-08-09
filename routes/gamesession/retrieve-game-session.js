const gameSessionModel = require('../../model/gamesession');

const retrieveGameSession = (req, res) => {
    const grpid = req.body.grpid;
    gameSessionModel.find({
        grpid: grpid
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = retrieveGameSession;