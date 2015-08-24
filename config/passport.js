var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(passport){
 passport.serializeUser(function(user, done) {
   done(null, user._id);
 });

 passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
     console.log('deserializing user:',user);
     done(err, user);
   });
 });
}