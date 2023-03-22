var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var validateCustomerRouter = require("./routes/validateUserCredentials");
var getRestuarantRouter = require("./routes/getRestuarantDetails");
var newUserSignup = require("./routes/newUserSignup");
var checkLoginRouter = require("./routes/checkLogin");
var addRestuarantRouter = require("./routes/addNewRestuarant");
var uploadPicRouter = require("./routes/uploadPic");
var logoutUser = require("./routes/logoutUser");
var singleProduct = require("./routes/getSingleResturant");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
    secret: 'Sample secret',
    resave: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/validate/customer/details', validateCustomerRouter);
app.use('/get/restuarantDetails', getRestuarantRouter);
app.use('/new/user/registration', newUserSignup);
app.use('/check/isUserLoggedin', checkLoginRouter);
app.use('/add/newRestuarant', addRestuarantRouter);
app.use('/upload/Image', uploadPicRouter);
app.use("/logout/Session", logoutUser);
app.use("/get/SingleProduct", singleProduct);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen

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
