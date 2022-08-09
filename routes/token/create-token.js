const tokenModel = require('../../model/token');

const createToken = (req, res) => {
    const token = req.body.token;
    const email = req.body.email;
    let tokenm = new tokenModel();
    tokenm.token = token;
    tokenm.email = email;
    tokenm.save((err, data) => {
        if(err){
            res.send(err);
        }
        else{
            res.send('Token added successfully');
        }
    })
}
module.exports = createToken;