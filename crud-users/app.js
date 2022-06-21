var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

const routerUsers = require('./routes/users.roote');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('connected to db'))
.catch(err=>console.log(err.message))


// const dotenv = require('dotenv')
// const mongoose = require('mongoose')
// dotenv.config()
//    module.exports = mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true })
//    .then(() => console.log('Connected to db'))
//    .catch(error => console.log({message.error})) 






app.use('/api', routerUsers);


module.exports = app;
