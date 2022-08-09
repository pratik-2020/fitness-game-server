const groupModel = require('../../model/group');

const retGrpData = (req, res) => {
    const grpid = req.body.grpid;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        if(response.length === 0){
            res.send('There is no such group id');
        }
        else{
            res.send(response);
        }
    }).catch((er) => {
        res.send(er.message);
    })
}

module.exports = retGrpData;