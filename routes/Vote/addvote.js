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
            grpid: response[0].grpid
        }).then((resp) => {
            console.log(resp);
            let votem = new voteModel();
            votem.email = email;
            votem.vote = vote;
            votem.level = resp[0].currentLevel;
            votem.save((err, data) => {
                if(err){
                    console.log(err);
                    res.send(err);
                }
                else{
                    console.log('Hello');
                    res.send('Vote added successfully');
                }
            })
        }).catch((er) => {
            console.log('welcome'+er);
            res.send(er);
        })
    }).catch((err) => {
        console.log('How '+err);
        res.send(err);
    })
}

module.exports = addVote;