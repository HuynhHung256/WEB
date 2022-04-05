const passport = require('passport');
const LocalStrategy = require('passport-local');
const service = require('./authenticationService');

passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(email, pass, cb) {
    const user = await service.verifyUser(email, pass);
    // if(user){
    //     return cb(null,user);
    // }
    return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user._id, email: user.email, role: user.role });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


module.exports = passport;
