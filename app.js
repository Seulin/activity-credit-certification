var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

//DB
//var bodyParser = require("body-parser")
var mongoose = require("mongoose")
let url =
  "mongodb+srv://seul:1234@cluster0-yfrsz.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Router variable
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static('public'));

//Set Router
app.use('/', indexRouter);
app.use('/users', usersRouter);



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
