const groupModel = require('../../model/group');

const leaderBoard = (req, res) => {
    groupModel.find({
        stat:"A"
    }).then((response) => {
        res.send(response);
    }).catch((er) => {
        res.send(er.message);
    });
}

module.exports = leaderBoard;