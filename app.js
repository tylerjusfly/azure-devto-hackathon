const createError = require('http-errors');
const express = require('express');
const  path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./config/auth');
const {envVariables} = require('./config/config')
const mongosession = require('connect-mongodb-session')(session)
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dishRouter = require('./routes/dish');

var app = express();


// MongoDB Config
// const url = 'mongodb://127.0.0.1:27017/StoreApi'
const url = envVariables.mongoDbString

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', _ => {console.log('Mongo Database connected:', url)})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Storing session to mongo dataabase.
const store = new mongosession({
  uri : url,
  collection : 'mysessions',
})

// Setting seesion
app.use(session({
  secret : config.secretKey,
  resave : false,
  saveUninitialized : false,
  store : store
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
