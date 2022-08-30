const groupModel = require('../../model/group');
const finaldecisionModel = require('../../model/finaldecison');

const chkFinalDecision = (req, res) => {
    const grpid = req.body.grpid;
    console.log(grpid);
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        console.log("response "+response[0]);
        finaldecisionModel.find({
            grpid: grpid,
            level: response[0].currentLevel
        }).then((rep1) => {
            console.log("rep1 "+rep1);
            if(response[0].currentLevel === '0'){
                res.send('Yes');
            }
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