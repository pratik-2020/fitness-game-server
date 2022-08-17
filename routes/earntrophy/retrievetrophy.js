const earntrophyModel = require('../../model/earnatrophy');

const retTrophy = (req, res) => {
    const grpid = req.body.grpid;
    earntrophyModel.find({
        grpid: grpid
    }).then((response) => {
        if(response.length === 0){
            res.send('No trophy');
        }
        else{
            res.send(response);
        }
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = retTrophy;