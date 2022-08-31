const voteModel = require('../../model/vote');
const groupModel = require('../../model/group');
const retrieveGroupVote = (req, res) => {
    const grpid = req.body.grpid;
    groupModel.find({
        grpid: grpid
    }).then((resp) => {
        console.log('Reps1');
        console.log(resp);
        if(resp.length > 0){
            let f = [];
            resp[0].users.map((e,key) => {
                if(e[1] === 'Accepted'){
                    f.push(e[0]);
                }
            })
            voteModel.find({
                grpid: grpid,
                level: resp[0].currentLevel
            }).then((rep1) => {
                if(rep1.length === f.length){
                    res.send('Yes');
                }
                else{
                    res.send('No');
                }
            }).catch((er1) => {
                res.send(er1);
            })
        }
        else{
            res.send('Group does not exist');
        }
    }).catch((Er2) => {
        res.send(Er2.message);
    })
}

module.exports = retrieveGroupVote;

