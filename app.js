const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/shop/index');
const checkoutRouter = require('./routes/user/checkout');
const cartRouter = require('./routes/user/cart');
const shopRouter = require('./routes/shop/shop');
const productdetailsRouter = require('./routes/user/product-details');
const signinRouter = require('./routes/signin');
const dashRouter = require('./routes/dashboard');
const chartRouter = require('./routes/chart');
const tableRouter = require('./routes/table');




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
app.use('/dashboard', dashRouter);
app.use('/chart', chartRouter);
app.use('/table', tableRouter);




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
