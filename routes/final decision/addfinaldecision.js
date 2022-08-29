const finaldecisionModel = require('../../model/finaldecison');
const groupModel = require('../../model/group');
const addFinalDecision = (req, res) => {
    const grpid = req.body.grpid;
    const decision = req.body.decision;
    const description = req.body.description;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        console.log(response);
        let finalm = new finaldecisionModel();
        finalm.grpid = grpid;
        finalm.decision = decision;
        finalm.description = description;
        finalm.level = response[0].currentLevel;
        finalm.save((err, data) => {
            if(err){
                res.send(err);
            }
            else{
                res.send('Decision added');
            }
        })
    }).catch((er) => {
        res.send(er);
    })
}

module.exports = addFinalDecision;