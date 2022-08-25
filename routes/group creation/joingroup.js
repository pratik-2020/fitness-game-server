const groupModel = require('../../model/group');

const joinGroup = (req, res) => {
    const grpid = req.body.grpid;
    const user = req.body.user;
    groupModel.find({
        grpid: grpid
    }).then((response) => {
        if(response.length === 0){
            console.log('Wel1');
            res.send('Group does not exist!!');
        }
        else if(response[0].users.length == 4){
            console.log('Wel2');
            res.send('Group size limit is already finished!!');
        }
        else{
            console.log('Wel3')
            response[0].users = [...response.users[0],[user, 'No respond']];
            groupModel.updateOne({
                _id: response._id
            }, response).then((resp) => {
                res.send('USer successfully joined the group!!');
            }).catch((er) => {
                res.send(er.message);
            });
        }
    }).catch(err => {
        console.log(err);
        res.send(err);
    })
}
//pratikthakur2019@gmail.com181660786576795

module.exports = joinGroup;