const groupModel = require('../../model/finaldecison');
const finaldecisionModel = require('../../model/finaldecison');

const chkFinalDecision = (req, res) => {
    const grpid = req.body.grpid;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        console.log(response[0]);
        finaldecisionModel.find({
            grpid: grpid,
            level: response[0].currentLevel
        }).then((rep1) => {
            console.log(rep1);
            if(rep1.length === 0){
                res.send('No');
            }
            else{
                res.send('Yes');
            }
        }).catch((er1) => {
            console.log('Hel1');
            res.send(er1);
        })
    }).catch((er2) => {
        console.log('Hel2');
        res.send(er2);
    })
}

module.exports = chkFinalDecision;