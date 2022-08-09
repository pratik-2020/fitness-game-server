const notificaionModel = require('../../model/notifications');

const retrieveNotification = (req, res) => {
    const email = req.body.email;
    notificaionModel.find({
        email: email
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        res.send(err);
    });
}

module.exports = retrieveNotification;