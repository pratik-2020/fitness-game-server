const gardenstoreModel = require('../../model/gardenstore');

const addItem = (req, res) => {
    const grpid = req.body.id;
    const itemname = req.body.itemname;
    const quantity = req.body.quantity;
    gardenstoreModel.find({
        grpid: grpid
    }).then((response) => {
        if(itemname === 'seed'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed + quantity,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'house'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house + quantity,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'smallplant'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant + quantity,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'mediumplant'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant + quantity,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'largeplant'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant + largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'weedkiller'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller + quantity,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'sodroller'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller + quantity,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'tree'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree + quantity,
                bag: response[0].bag,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else if(itemname === 'bag'){
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag + quantity,
                flower: response[0].flower
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
        else{
            gardenstoreModel.updateOne({
                grpid: grpid
            }, {
                _id: response[0]._id,
                grpid: grpid,
                seed: response[0].seed,
                house: response[0].house,
                smallplant: response[0].smallplant,
                mediumplant: response[0].mediumplant,
                largeplant: response[0].largeplant,
                weedkiller: response[0].weedkiller,
                sodroller: response[0].sodroller,
                tree: response[0].tree,
                bag: response[0].bag,
                flower: response[0].flower + quantity
            }).then((rep) => {
                res.send('Item addedd successfully');
            }).catch((err) => {
                res.send(err);
            })
        }
    }).catch((er) => {
        res.send(er);
    })
}

module.exports = addItem;