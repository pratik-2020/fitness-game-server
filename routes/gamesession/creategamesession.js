const gameSessionModel = require('../../model/gamesession');

const creategamesession = (req, res) => {
    const name = req.body.name;
    const userid = req.body.id;
    const usertype = req.body.usertype;
    const que1 = req.body.que1;
    let gamesessionm = new gameSessionModel();
    gamesessionm.name = name;
    gamesessionm.userid = userid;
    gamesessionm.usertype = usertype;
    gamesessionm.que1 = que1;
    gamesessionm.save((err, data) => {
        if(err){
            res.send(err);
        }
        else{
            res.send('Game Session created!!!');
        }
    })
}

module.exports = creategamesession;