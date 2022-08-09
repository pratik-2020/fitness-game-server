const notificationModel = require('../../model/notifications');

const sendNotification = (req, res) => {
    const email = req.body.email;
    const grpid = req.body.grpid;
    const message = req.body.message;

    let notifim = new notificationModel();
    notifim.email = email;
    notifim.grpid = grpid;
    notifim.message = message;
    notifim.seen = false;

    notifim.save((err, data) => {
        if(err){
            res.send(err);
        }
        else{
            res.send('Notification send');
        }
    })
}

module.exports = sendNotification;