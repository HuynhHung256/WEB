const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Home
const homeRouter = require('./components/home/homeRoute');

// Shop
const shopRouter = require('./components/shop/shopRoute');

// Admin
const adminRouter = require('./components/admin/adminRoute');
const insertRouter= require('./components/admin/insertRoute');
const createAdminRouter= require('./components/admin/createAdminRoute');

// Authentication
const signinRouter = require('./components/authentication/signinRoute');
const signupRouter = require('./components/authentication/signupRoute');


// not yet
// const productdetailsRouter = require('./components/shop/product-details');
const checkoutRouter = require('./components/user/checkout');
const cartRouter = require('./components/user/cart');
const userRouter=require('./components/user/user.js');


// user

// const adminviewRouter=require('./components/admin/admin-view');






const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// home
app.use('/', homeRouter);

// shop
app.use('/shop', shopRouter);

// admin
app.use('/admin',adminRouter);
app.use('/insert',insertRouter);
app.use('/create-admin',createAdminRouter);

// authentication
app.use('/signin',signinRouter);
app.use('/signup',signupRouter);

// user
app.use('/user',userRouter);
app.use('/checkout', checkoutRouter);
app.use('/cart', cartRouter);


// app.use('/insert',insertRouter);
// app.use('/product-details', productdetailsRouter);
// app.use('/signin', signinRouter);
// app.use('/insert',insertRouter);
// app.use('/admin-view',adminviewRouter);




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
