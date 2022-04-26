const createError = require('http-errors');
const express = require('express');
const paypal = require('paypal-rest-sdk');
const exphdbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs=require('fs');

const session = require('express-session');
const passport = require('./components/authentication/passport');
const hbs = require('express-hbs');

// Home
// const homeRouter = require('./components/home/homeRoute');

// Shop
const shopRouter = require('./components/shop/shopRoute');

// Admin
const adminRouter = require('./components/admin/adminRoute');
const insertRouter = require('./components/admin/insertRoute');
const createAdminRouter = require('./components/admin/createAdminRoute');

// Authentication
const signinRouter = require('./components/authentication/signinRoute');
const signupRouter = require('./components/authentication/signupRoute');
const signoutRouter = require('./components/authentication/signoutRoute');
const roleRouter = require('./components/authentication/roleRoute');


// not yet
// const productdetailsRouter = require('./components/shop/product-details');
const checkoutRouter = require('./components/cart/checkout');
const cartRouter = require('./components/cart/cart');
const userRouter = require('./components/user/user');

//cart
// user

// const adminviewRouter=require('./components/admin/admin-view');




// var items=JSON.parse(fs.readFileSync(''));
// var total =0;
// for(i = 0;i<items.length;i++)
// {
//   total+=parseFloat(items[i].price)*items[i].quantity;
// }
// app.get('/', function(req, res){
//   res.render('index');
// });

// app.post('/pay', function (req, res) {
//   var create_payment_json = {
//     "intent": "sale",
//     "payer": {
//       "payment_method": "paypal"
//     },
//     "redirect_urls": {
//       "return_url": "http://localhost:3000/success",
//       "cancel_url": "http://localhost:3000/cancle"
//     },
//     "transactions": [{
//       "item_list": {
//         "items": items
//       },
//       "amount": {
//         "currency": "USD",
//         "total": total.toString()
//       },
//       "description": "This is the payment description."
//     }]
//   };
//   paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//       throw error;
//     } else {
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === 'approval_url') {
//           res.redirect(payment.links[i].href);
//         }
//       }
//     }
//   });
// })

// app.get('/cancle', function(req, res){
//   res.render('cancle');
// });

// app.get('/success', function (req, res) {
//   const payerId = req.query.PayerID;
//   const paymentId = req.query.paymentId;

//   const execute_payment_json = {
//     "payer_id": payerId,
//     "transactions": [{
//       "amount": {
//         "currency": "USD",
//         "total": total.toString()
//       }
//     }]
//   };

//   paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
//     if (error) {
//       res.render('cancle');
//     } else {
//       console.log(JSON.stringify(payment));
//       res.render('success');
//     }
//   });
// })
const app = express();

// view engine setup
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Af3DQO0wvLSWi3Ca0DxHRCexMhAMF7cIKSMz0aw2DzE2_RnBG6kRXtVD2w0exD_D92RTiDfDPskjgZVK',
  'client_secret': 'ENRfPRLO9GW5IMtvMOVJIpof-joFy_VgZ3BTHmqlzdgnnU07SCZaErNzc0d2Pr2bunfaGWLJHxcKoMM1'
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});



// home
app.use('/', shopRouter);

// shop
// app.use('/shop', shopRouter);

// admin
app.use('/admin', adminRouter);
app.use('/insert', insertRouter);
app.use('/create-admin', createAdminRouter);

// authentication
app.use('/signin', signinRouter);
app.use('/signup', signupRouter);
app.use('/signout', signoutRouter);
app.use('/role-error', roleRouter);



// user
app.use('/user', userRouter);
app.use('/checkout', checkoutRouter);
app.use('/cart', cartRouter);


// app.use('/insert',insertRouter);
// app.use('/product-details', productdetailsRouter);
// app.use('/signin', signinRouter);
// app.use('/insert',insertRouter);
// app.use('/admin-view',adminviewRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
