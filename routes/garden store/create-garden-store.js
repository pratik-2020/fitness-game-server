const gardenstoreModel = require('../../model/gardenstore');

const createGarden = (req, res) => {
    const grpid = req.body.grpid;
    let gardenstorem = new gardenstoreModel();
    gardenstorem.seed = 0;
    gardenstorem.house = 0;
    gardenstorem.smallplant = 0;
    gardenstorem.mediumplant = 0;
    gardenstorem.largeplant = 0;
    gardenstorem.weedkiller = 0;
    gardenstorem.sodroller = 0;
    gardenstorem.tree = 0;
    gardenstorem.bag = 0;
    gardenstorem.flower = 0;
    gardenstorem.grpid = grpid;
    gardenstorem.save((err, data) => {
        if(err){
            res.send('Error occoured');
        }
        else{
            res.send('Store created');
        }
    });
}

module.exports = createGarden;