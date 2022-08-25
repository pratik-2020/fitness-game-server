const groupModel = require('../../model/finaldecison');
const finaldecisionModel = require('../../model/finaldecison');

const chkFinalDecision = (req, res) => {
    const grpid = req.body.grpid;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        finaldecisionModel.find({
            grpid: grpid,
            level: response[0].currentLevel
        }).then((rep1) => {
            if(rep1.length === 0){
                res.send('No');
            }
            else{
                res.send('Yes');
            }
        }).catch((er1) => {
            res.send(er1);
        })
    }).catch((er2) => {
        res.send(er2);
    })
}

module.exports = chkFinalDecision;