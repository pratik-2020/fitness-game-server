const gardenstoreModel = require('../../model/gardenstore');

const retGarden = (req, res) => {
    const grpid = req.body.grpid;
    gardenstoreModel.find({
        grpid: grpid
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = retGarden;