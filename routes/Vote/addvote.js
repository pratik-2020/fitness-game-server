const voteModel = require('../../model/vote');
const userModel = require('../../model/user');
const groupModel = require('../../model/group');
const addVote = (req, res) => {
    const email = req.body.email;
    const vote = req.body.vote;
    const session = req.body.session;
    userModel.find({
        email: email
    }).then((response) => {
        groupModel.find({
            grpid: response.grpid
        }).then((resp) => {
            let votem = new voteModel();
            votem.email = email;
            votem.vote = vote;
            votem.level = resp.currentLevel;
            votem.save((err, data) => {
                if(err){
                    res.send('Error occoured');
                }
                else{
                    res.send('Vote added successfully');
                }
            })
        }).catch((er) => {
            res.send(er);
        })
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = addVote;