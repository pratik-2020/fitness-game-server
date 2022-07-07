const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const argv = require('yargs').argv;
const addUser = require('./routes/user/adduser');
const login = require('./routes/user/login');
const createGroup = require('./routes/group creation/creategroup');
const joinGroup = require('./routes/group creation/joingroup');
const updateGroup = require('./routes/group creation/updateGroup');
const sendJoinReq = require('./routes/group creation/send-join-req');
const replyJoinReq = require('./routes/group creation/reply-join-request');
const otpCreation = require('./routes/Otp/OtpCreation');
const otpVerification = require('./routes/Otp/otp-verification');
const passChangeOtp = require('./routes/Otp/pass-change-otp');
const pasOtpVerification = require('./routes/Otp/password-otp-verification');
const app = express();
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
app.post('/adduser', (req, res) => {
    addUser(req, res);
})
app.post('/creategroup', (req, res) => {
    createGroup(req, res);
})
app.post('/joingroup', (req, res) => {
    joinGroup(req, res);
})
app.post('/updategroup', (req, res) => {
    updateGroup(req, res);
});
app.post('/sendjoinreq', (req, res) => {
    sendJoinReq(req, res);
})
app.post('/login', (req, res) => {
    login(req, res);
})
app.post('/replyjoinreq', (req, res) => {
    replyJoinReq(req, res);
});
app.post('/otpcreation', (req, res) => {
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
})
const pt = argv.port || 3001;
app.listen( pt, () => {
    console.log("Listening at "+pt+"!!");
});