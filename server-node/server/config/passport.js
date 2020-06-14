var JwtStrategy = require('passport-jwt').Strategy;
let config = require('../config/config');

module.exports = function(passport) {
 var opts = {};
 opts.secretOrKey = config.secret;
 passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    if (jwt_payload.tokenExpDate <= Math.round(Date.now() / 1000)) {
        return done(null, false, {message: "Expired Token"});
    } else {
        return done(null, jwt_payload.email);
    }
 }));
};