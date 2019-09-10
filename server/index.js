const express = require("express");
const session = require('express-session');
const {getAllMessages, creatMessage, getHistory} = require('./messagesCtrl');
require("dotenv").config();
let {SERVER_PORT} = process.env;

const app = express();

app.use(express.json());

//top level middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60
    }
  }))

app.use((req, res, next) => {
let badWords = ['knucklehead', 'jerk', 'internet explorer'];
if (req.body.message) {
    for (let i = 0; i < badWords.length; i++) {
    let regex = new RegExp(badWords[i], 'g');
    req.body.message = req.body.message.replace(regex, '****');
    }
    next();
} else {
    next();
}
});


//endpoints
app.get('/api/messages', getAllMessages)
app.post('/api/message', creatMessage)
app.get('/api/messages/history', getHistory)

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})