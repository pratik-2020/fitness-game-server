const voteModel = require('../../model/vote');

const retrieveVote = (req, res) => {
    const email = req.body.email;
    const level = req.body.level;

    voteModel.find({
        email:email,
        level:level
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    });
}

module.exports = retrieveVote;