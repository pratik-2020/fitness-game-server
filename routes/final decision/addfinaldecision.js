const finaldecisionModel = require('../../model/finaldecison');
const groupModel = require('../../model/group');
const addFinalDecision = (req, res) => {
    const grpid = req.body.grpid;
    const decision = req.body.decision;
    const description = req.body.description;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        if(response.length > 0){
            let finalm = new finaldecisionModel();
            finalm.grpid = grpid;
            finalm.level = response[0].currentLevel;
            finalm.decision = decision;
            finalm.description = description;
            finalm.save((err, data) => {
                if(err){
                    console.log('Er1');
                    console.log(err);
                    res.send(err);
                }
                else{
                    res.send('Decision added');
                }
            })
        }
        else{
            console.log('Grp DNE');
            res.send('Group does not exist');
        }
    }).catch((er) => {
        console.log('Er2');
        console.log(er);
        res.send(er);
    })
}

module.exports = addFinalDecision;


// Decision added