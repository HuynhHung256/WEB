const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// shop
const indexRouter = require('./components/shop/index');
const shopRouter = require('./components/shop/shop');
const productdetailsRouter = require('./components/shop/product-details');
const checkoutRouter = require('./components/user/checkout');
const cartRouter = require('./components/user/cart');
const signinRouter = require('./components/shop/signin');
const userRouter=require('./components/user/user.js');


// user

// admin
const adminRouter = require('./components/admin/admin');
const insertRouter= require('./components/admin/insert');
const adminviewRouter=require('./components/admin/admin-view');






const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/checkout', checkoutRouter);
app.use('/cart', cartRouter);
app.use('/shop', shopRouter);
app.use('/product-details', productdetailsRouter);
app.use('/signin', signinRouter);
app.use('/admin',adminRouter);
app.use('/insert',insertRouter);
app.use('/user',userRouter);
app.use('/admin-view',adminviewRouter);


// app.use('/insert',insertRouter);





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
