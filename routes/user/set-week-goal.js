const userModel = require('../../model/user');
const groupModel = require('../../model/group');

const setWeekGoal = (req, res) => {
    const email = req.body.email;
    const gl = req.body.gl;

    userModel.find({
        email: email
    }).then((response) => {
        if(response.length === 0){
            res.send('User does not exist');
        }
        else if(response.length === 1){
            response[0].goals.push(gl);
            userModel.updateOne({
                email: email
            }, {
                _id: response[0]._id,
                email: email,
                goals: response[0].goals,
                grpid: response[0].grpid,
                name: response[0].name,
                gender: response[0].gender,
                usertype: response[0].usertype,
                password: response[0].password
            }).then((rsp) => {
                groupModel.find({
                    grpid: response[0].grpid
                }).then((resp) => {
                    if(resp.length === 0){
                        res.send('Group does not exist');
                    }
                    else if(resp.length === 1){
                        resp[0].weekGoal.push({
                            email: gl
                        });
                        groupModel.updateOne({
                            grpid: response[0].grpid
                        }, {
                            _id: resp[0]._id,
                            users: resp[0].users,
                            currentLevel: resp[0].currentLevel,
                            grpid: resp[0].grpid,
                            admin: resp[0].admin,
                            vote: resp[0].vote,
                            weekGoal: resp[0].weekGoal
                        }).then((rp) => {
                            res.send('Week goal addedd successfully');
                        }).catch((error) => {
                            res.send(error);
                        })
                    }
                })
                res.send('Weekly goal set');

            }).catch((er) => {
                res.send(er);
            })
        }
    }).catch((err) => {
        res.send(err);
    })
}

module.exports = setWeekGoal;