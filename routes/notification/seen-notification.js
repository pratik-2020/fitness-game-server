const notificationModel = require('../../model/notifications');

const seenNotification = (req, res) => {
    const id = req.body.id;
    notificationModel.find({
        _id: id
    }).then((response) => {
        notificationModel.updateOne({
            _id: id
        }, {
            _id: id,
            email: response[0].email,
            grpid: response[0].grpid,
            message: response[0].message,
            seen: true
        }).then((resp) => {
            res.send('Message seen');
        }).catch((er) => {
            res.send(err);
        })
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = seenNotification;