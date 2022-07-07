const groupModel = require('../../model/group');

const updateGroup = (req, res) => {
    const id = req.body.id;
    const grp = req.body.grp;
    groupModel.updateOne({
        grpid: grpid
    },grp).then((response) => {
        res.send('Group updated successfully!!');
    }).catch((err) => {
        res.send(err.message);
    });
}


module.exports = updateGroup;