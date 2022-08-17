const earnatrophyModel = require('../../model/earnatrophy');
const groupModel = require('../../model/group');
const verifyTrophy = (req, res) => {
    const grpid = req.body.grpid;
    const level = req.body.level;
    const point = req.body.point;
    earnatrophyModel.find({
        grpid: grpid,
        level: level
    }).then((response) => {
        if(response.length === 0){
            res.send('No trophy')
        }
        else{
            groupModel.find({
                grpid: grpid
            }).then((resp) => {
                if(resp[0].points <= point ){
                    earnatrophyModel.updateOne({
                        grpid: grpid,
                        level: level
                    }, {
                        _id: response[0]._id,
                        trophy: response[0].trophy,
                        level: level,
                        point: point,
                        grpid: grpid,
                        achieved: 'true'
                    }).then((rep) => {
                        res.send('Trophy acieved');
                    }).catch((err) => {
                        res.send(err);
                    })
                }
                else{
                    earnatrophyModel.updateOne({
                        grpid: grpid,
                        level: level
                    }, {
                        _id: response[0]._id,
                        trophy: response[0].trophy,
                        level: level,
                        point: point,
                        grpid: grpid,
                        achieved: 'false'
                    }).then((rep) => {
                        res.send('Trophy acieved');
                    }).catch((err) => {
                        res.send(err);
                    })
                }
            }).catch((er) => {
                res.send(er);
            })
        }
    }).catch((e) => {
        res.send(e);
    })
}

module.exports = verifyTrophy;