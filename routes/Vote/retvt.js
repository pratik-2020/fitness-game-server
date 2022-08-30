const voteModel = require('../../model/vote');
const groupModel = require('../../model/group');

const retvt = (req, res) => {
    const grpid = req.body.grpid;
    groupModel.find({
        grpid: grpid
    }).then((resp1) => {
        console.log('Grp data');
        console.log(resp1);
        voteModel.find({
            grpid: grpid,
            level : resp1[0].currentLevel
        }).then((resp2) => {
            console.log('Vote data');
            console.log(resp2);
            res.send(resp2);
        }).catch((er2) => {
            res.send(er2);
        })
    }).catch((er1) => {
        res.send(er1);
    })
}

module.exports = retvt;