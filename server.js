const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const argv = require('yargs').argv;
const addUser = require('./routes/user/adduser');
const login = require('./routes/user/login');
const createGroup = require('./routes/group creation/creategroup');
const joinGroup = require('./routes/group creation/joingroup');
const updateGroup = require('./routes/group creation/updateGroup');
const earntrophyModel = require('./model/earnatrophy');
const sendJoinReq = require('./routes/group creation/send-join-req');
const replyJoinReq = require('./routes/group creation/reply-join-request');
const otpCreation = require('./routes/Otp/OtpCreation');
const otpVerification = require('./routes/Otp/otp-verification');
const passChangeOtp = require('./routes/Otp/pass-change-otp');
const pasOtpVerification = require('./routes/Otp/password-otp-verification');
const retGrpData = require('./routes/group creation/retrieve-grp-data');
const retUserData = require('./routes/user/retrieve-user-data');
const passUpdate = require('./routes/user/password-update');
const urlParse = require('url-parse');
const bodyParser = require('body-parser');
const finaldecisionModel = require('./model/finaldecison');
const queryPArse = require('query-string');
const app = express();
const request = require('request');
const addtrophy = require('./routes/earntrophy/addtrophy');
const { google, indexing_v3 } = require('googleapis');
const tokenModel = require('./model/token');
const { default: axios } = require('axios');
const sendNotification = require('./routes/notification/send-notification');
const seenNotification = require('./routes/notification/seen-notification');
const creategamesession = require('./routes/gamesession/creategamesession');
const updateGameSession = require('./routes/gamesession/updategamesession');
const retrieveGameSession = require('./routes/gamesession/retrieve-game-session');
const leaderBoard = require('./routes/group creation/leader-board');
const retrieveNotification = require('./routes/notification/retrieve-notification');
const addvote = require('./routes/Vote/addvote');
const createToken = require('./routes/token/create-token');
const groupModel = require('./model/group');
const gamesessionModel = require('./model/gamesession');
const userModel = require('./model/user');
const gameSessionModel = require('./model/gamesession');
const retGarden = require('./routes/garden store/retrieve-garden-store');
const createGarden = require('./routes/garden store/create-garden-store');
const addItem = require('./routes/garden store/add-item');
const retTrophy = require('./routes/earntrophy/retrievetrophy');
const changeLeader = require('./routes/garden store/change-leader');
const setCustom = require('./routes/group creation/set-custom');
const verifyTrophy = require('./routes/earntrophy/verifytrophy');
const chkFinalDecision = require('./routes/final decision/chk-final-decision');
const retrieveVote = require('./routes/Vote/retrieve-vote');
const addFinalDecision = require('./routes/final decision/addfinaldecision');
const updateStepsPoints = require('./routes/garden store/update-points-steps');
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: [
        'GET',
        'POST'
    ]
}));
const db = 'mongodb+srv://Pratik:Pratik@cluster0.mdzh4.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successful!!!');
})
.catch((err) => {
    console.log(err.message);
})
app.get('/', (req, res) => {
    res.send('Welcome');
});
app.post('/retrievenotification',(req, res) => {
    retrieveNotification(req, res);
});
app.post('/addvote', (req, res) => {
    addvote(req, res);
})
app.post('/url', (req, res) => {
    const email = req.body.email;
    console.log(email);
    // const state = { em : email};
    const oauth2Client = new google.auth.OAuth2(
        "611658826728-ob0ffv5qe6gee0o4q32afip1ldb71632.apps.googleusercontent.com",
        "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",
        "https://www.fitness-game-server.heroku/points"
    );

    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"]
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: JSON.stringify({
            callbackURL: req.body.callbackURL,
            userId: req.body.userid,
            em:email
        })
    })
    res.send(req.body.callbackURL);

    request(url, (err, response, body) => {
        console.log("error ", err);
        console.log("statusCode: ", response && response.statusCode);
        res.send({url});
        const queryURL = new urlParse(url);
        const code = queryPArse.parse(queryURL.query).client_id;
        console.log(code);
    })
});
app.get('/points', async(req, res) => {
    const queryURL = new urlParse(req.url);
    const code = queryPArse.parse(queryURL.query).code;
    const email = JSON.parse(queryPArse.parse(queryURL.query).state).em;
    //console.log("email "+JSON.parse(email).em);
    console.log(code);
    console.log(email);
    userModel.find({
        email: email
    }).then(async (rep10) => {
        groupModel.find({
            grpid: rep10.grpid
        }).then(async (rep11) => {
            gamesessionModel.find({
                _id: rep11.session
            }).then(async (rep12) => {
                const oauth2Client = new google.auth.OAuth2(
                    "611658826728-ob0ffv5qe6gee0o4q32afip1ldb71632.apps.googleusercontent.com",
                    "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",
                    "https://www.fitness-game-server.heroku.com/points",
                    true
                );
                const tokens = await oauth2Client.getToken(code);
                // console.log(tokens);
                res.send('Hello');
                let stp = 0, pt=0;
                let stepArray = [];
                
            try{
                console.log("hi");
                const crttim = new Date().getTime();
                const result = await axios({
                    method: "POST",
                    headers: {
                        authorization: "Bearer " + tokens.tokens.access_token,
                    },
                    "Content-Type": "application/json",
                    url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
                    data: {
                        aggregateBy: [
                            {
                                dataTypeName: "com.google.heart_minutes",//"com.google.step_count.delta",
                                dataSourceId: "derived:com.google.heart_minutes:com.google.android.gms:merge_heart_minutes" //"derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                            }
                        ],
                        bucketByTime: {
                            durationMillis: 864000
                        },
                        startTimeMillis: crttim - (new Date().getDate() - parseInt(rep12.week_start_date))*24*60*60*1000,
                        endTimeMillis: crttim,
        
                    }
                })
                // console.log(result);
                stepArray = result.data.bucket
            }catch(e){
                res.send(e.message);
            }
            try{
                let pt1 = 0;
                for(const set of stepArray){
                    for(const pt of set.dataset){
                        for(const pt2 of pt.point){
                            pt1 = pt1 + pt2;
                        }
                    }
                }
                userModel.find({
                    email
                }).then((response) => {
                    userModel.updateOne({
                        email: email
                    },{
                        _id: response._id,
                        name: response.name,
                        usertype: response.usertype,
                        grpid: response.grpid,
                        password: response.password,
                        email: email,
                        goals: response.goals,
                        steps:response.steps,
                        point: ""+pt1
                    }).then((resp) => {
                        groupModel.find({
                            grpid: response.grpid
                        }).then((rep) => {
                            groupModel.updateOne({
                                grpid: response.grpid
                            }, {
                                _id:rep._id,
                                users: rep.users,
                                currentLevel:rep.currentLevel,
                                grpid:rep.grpid,
                                admin:rep.admin,
                                weekGoal:rep.weekGoal,
                                points:""+pt1,
                                stat:rep.stat,
                                steps:rep.steps,
                                session:rep.session
                            }).then((rep1) => {
                                gamesessionModel.find({
                                    _id: rep.session
                                }).then((rep2) => {
                                    gamesessionModel.updateOne({
                                        _id:rep.session
                                    }, {
                                        _id: rep.session,
                                        grpid: rep.grpid,
                                        week_start_date:rep2.week_start_date,
                                        week_goal: rep2.week_goal,
                                        total_achieved_steps: rep2.total_achieved_steps,
                                        total_points:""+pt1,
                                        individual_contribution:ind,
                                        current_checkpoint:rep2.current_checkpoint
                                    }).then((rep3) => {
                                        res.send('Data updated successfully');
                                    }).catch((er1) => {
                                        res.send(er1);
                                    })
                                }).catch((er2) => {
                                    res.send(er2);
                                })
                            }).catch((er3) => {
                                res.send(er3);
                            })
                        }).catch((er4) => {
                            res.send(er4);
                        })
                    }).catch((er5) => {
                        res.send(er5);
                    })
                }).catch((er6) => {
                    res.send(er6);
                })
            }catch(e){
                console.log(e)
            }
            }).catch((er10) => {
                res.send(er10);
            })
        }).catch((er11) => {
            res.send(er11);
        })
    }).catch((er12) => {
        res.send(er12);
    })
});
app.post('/getURL', (req, res) => {
    const email = req.body.email;
    console.log(email);
    // const state = { em : email};
    const oauth2Client = new google.auth.OAuth2(
      {clientId:"611658826728-ob0ffv5qe6gee0o4q32afip1ldb71632.apps.googleusercontent.com",
        clientSecret:"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",
        redirectUri:"https://fitness-game-server.herokuapp.com/steps"}
        // true
    );

    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read profile email openid"]
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
        state: JSON.stringify({
            callbackURL: req.body.callbackURL,
            userId: req.body.userid,
            em:email
        })
    })

    request(url, (err, response, body) => {
        console.log("error ", err);
        console.log("statusCode: ", response && response.statusCode);
        res.send({url});
        const queryURL = new urlParse(url);
        const code = queryPArse.parse(queryURL.query).client_id;
        console.log(code);
    })
});
app.get('/steps', async (req, res) => {
    const queryURL = new urlParse(req.url);
    const code = queryPArse.parse(queryURL.query).code;
    const email = JSON.parse(queryPArse.parse(queryURL.query).state).em;
    //console.log("email "+JSON.parse(email).em);
    console.log(code);
    console.log(email);
    userModel.find({
        email: email
    }).then(async (rep10) => {
        groupModel.find({
            grpid: rep10.grpid
        }).then(async (rep11) => {
            gamesessionModel.find({
                _id: rep11.session
            }).then(async (rep12) => {
                const oauth2Client = new google.auth.OAuth2(
                    {clientId:"611658826728-ob0ffv5qe6gee0o4q32afip1ldb71632.apps.googleusercontent.com",
                    clientSecret:"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",
                    redirectUri:"https://fitness-game-server.herokuapp.com/steps"
                }
                );
                const tokens = await oauth2Client.getToken(code);
                // console.log(tokens);
                res.send('Hello');
                let stp = 0, pt=0;
                let stepArray = [];
                try{
                    const crttim = new Date().getTime();
                    const result = await axios({
                        method: "POST",
                        headers: {
                            authorization: "Bearer " + tokens.tokens.access_token,
                        },
                        "Content-Type": "application/json",
                        url: "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate",
                        data: {
                            aggregateBy: [
                                {
                                    dataTypeName: "com.google.step_count.delta",
                                    dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                                }
                            ],
                            bucketByTime: {
                                durationMillis: 864000
                            },
                            startTimeMillis: crttim - (new Date().getDate() -  parseInt(rep12.week_start_date))*24*60*60*1000,
                            endTimeMillis: crttim,
                        }
                    })
                    // console.log(result);
                    stepArray = result.data.bucket
                }catch(e){
                    res.send(e.message);
                }
                try{
                    for(const dataSet of stepArray){
                        for(const points of dataSet.dataset){
                            for(const steps of points.point){
                                console.log(steps.value[0].intVal);
                                stp = stp + steps.value[0].intVal;
                            }
                        }
                    }
                    userModel.find({
                        email
                    }).then((response) => {
                        const dt = parseInt(rep11[0].currentLevel);
                        if(parseInt(rep11[0].weekGoal) <= stp){
                            dt = dt + 1;
                        }
                        finaldecisionModel.find({
                            grpid: rep11[0].grpid,
                            level: ""+dt
                        }).then((ans) => {
                            if(ans[0].decision === 'Earn a trophy' && stp >= parseInt(ans[0].description)){
                                earntrophyModel.updateOne({
                                    grpid: rep11[0].grpid,
                                    level: ""+dt
                                }, {
                                    achieved: "Yes"
                                }).then((ans2) => {
                                    console.log('Trophy earned');
                                }).catch((pr) => {
                                    res.send(pr);
                                })
                            }
                        })
                        userModel.updateOne({
                            email: email
                        },{
                            _id: response._id,
                            name: response.name,
                            usertype: response.usertype,
                            grpid: response.grpid,
                            password: response.password,
                            email: email,
                            goals: response.goals,
                            steps:""+stp,
                            point: response.point
                        }).then((resp) => {
                            groupModel.find({
                                grpid: response.grpid
                            }).then((rep) => {
                                groupModel.updateOne({
                                    grpid: response.grpid
                                }, {
                                    _id:rep._id,
                                    users: rep.users,
                                    currentLevel:""+dt,
                                    grpid:rep.grpid,
                                    admin:rep.admin,
                                    weekGoal:rep.weekGoal,
                                    points:rep.points,
                                    stat:rep.stat,
                                    steps:""+stp,
                                    session:rep.session
                                }).then((rep1) => {
                                    gamesessionModel.find({
                                        _id: rep.session
                                    }).then((rep2) => {
                                        gamesessionModel.updateOne({
                                            _id:rep.session
                                        }, {
                                            _id: rep.session,
                                            grpid: rep.grpid,
                                            week_start_date:rep2.week_start_date,
                                            week_goal: rep2.week_goal,
                                            total_achieved_steps: ""+stp,
                                            total_points:rep2.total_points,
                                            individual_contribution:ind,
                                            current_checkpoint:rep2.current_checkpoint
                                        }).then((rep3) => {
                                            res.send('Data updated successfully');
                                        }).catch((er1) => {
                                            res.send(er1);
                                        })
                                    }).catch((er2) => {
                                        res.send(er2);
                                    })
                                }).catch((er3) => {
                                    res.send(er3);
                                })
                            }).catch((er4) => {
                                res.send(er4);
                            })
                        }).catch((er5) => {
                            res.send(er5);
                        })
                    }).catch((er6) => {
                        res.send(er6);
                    })
                }catch(e){
                    console.log(e)
                }
            }).catch((err10) => {
                res.send(err10);
            })
        }).catch((err11) => {
            res.send(err11);
        })
    }).catch((err12) => {
        res.send(err12);
    })
});
app.get('/leaderboard',(req, res) => {
    leaderBoard(req, res);
});
app.post('/retvote', (req,res) => {
    retrieveVote(req, res);
})
app.post('/sendnotification', (req, res) => {
    sendNotification(req, res);
});
app.post('/changeleader', (req, res) => {
    changeLeader(req, res);
})
app.post('/seeennotification', (req,res) => {
    seenNotification(req,res);
})
app.post('/adduser', (req, res) => {
    addUser(req, res);
});
app.post('/chkfinaldecision', (req, res) => {
    chkFinalDecision(req, res);
})
app.post('/creategroup', (req, res) => {
    createGroup(req, res);
});
app.post('/addfinal', (req, res) => {
    addFinalDecision(req,res);
})
app.post('/setcustom', (req, res) => {
    setCustom(req, res);
})
app.post('/updatestepspoints', (req, res) => {
    updateStepsPoints(req, res);
})
app.post('/joingroup', (req, res) => {
    joinGroup(req, res);
});
app.post('/verifytrophy', (req, res) => {
    verifyTrophy(req, res);
})
app.post('/updategroup', (req, res) => {
    updateGroup(req, res);
});
app.post('/updatepass', (req, res) => {
    passUpdate(req, res);
});
app.post('/retgarden', (req, res) => {
    retGarden(req, res);
});
app.post('/creategarden', (req, res) => {
    createGarden(req, res);
});
app.post('/additem', (req, res) => {
    addItem(req, res);
});
app.post('/retuserdata', (req, res) => {
    retUserData(req, res);
})
app.post('/sendjoinreq', (req, res) => {
    sendJoinReq(req, res);
})
app.post('/login', (req, res) => {
    login(req, res);
})
app.post('/replyjoinreq', (req, res) => {
    replyJoinReq(req, res);
});
app.post('/addtrophy', (req, res) => {
    addtrophy(req, res);
});
app.post('/rettrophy', (req, res) => {
    retTrophy(req, res);
})
app.post('/otpcreation', (req, res) => {
    console.log(req);
    otpCreation(req, res);
});
app.post('/otpverification', (req, res) => {
    otpVerification(req, res);
})
app.post('/passotpverification', (req, res) => {
    pasOtpVerification(req, res);
})
app.post('/passotpcreation', (req, res) => {
    passChangeOtp(req, res);
});
app.post('/retgrpdata', (req, res) => {
    retGrpData(req, res);
});
app.post('/createsession', (req, res) => {
    creategamesession(req, res);
});
app.post('/updatesession', (req, res) => {
    updateGameSession(req, res);
});
app.post('/retrievesession', (req, res) => {
    retrieveGameSession(req, res);
})
const pt = argv.port || 3001;
app.listen( pt, () => {
    console.log("Listening at "+pt+"!!");
});

//clid: //611658826728-qbookb8g7nhn1a65vrs0s7u3upvga2hc.apps.googleusercontent.com
//clscrt: // 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