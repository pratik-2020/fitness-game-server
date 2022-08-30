const finaldecisionModel = require('../../model/finaldecison');
const groupModel = require('../../model/group');
const userModel = require('../../model/user');
const addFinalDecision = (req, res) => {
    const grpid = req.body.grpid;
    const decision = req.body.decision;
    const description = req.body.description;
    const email = req.body.email;
    userModel.find({
        email: email
    }).then((rep1) => {
        console.log('Rep1');
        console.log(rep1);
        groupModel.find({
            grpid: rep1[0].grpid
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
                        console.log(err);
                    }
                    else{
                        res.send('Decision added');
                    }
                })
            }
            else{
                console.log('Grp DNE');
            }
        }).catch((er) => {
            console.log('Er2');
            console.log(er);
            console.log(er);
        })
    }).catch((er3) => {
        console.log(er3);
    })
}

module.exports = addFinalDecision;


// Decision added