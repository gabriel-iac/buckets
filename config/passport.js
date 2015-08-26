var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy = require('passport-local').Strategy;

//FACEBOOK LOGIN

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

 passport.use('facebook', new FacebookStrategy({
  clientID        : process.env.FACEBOOK_KEY_API,
  clientSecret    : process.env.FACEBOOK_SECRET_API,
  callbackURL     : 'http://localhost:3000/auth/facebook/callback',
  enableProof     : true,
  profileFields   : ['name', 'emails']
}, function(access_token, refresh_token, profile, done) {
    // // Use this to see the information returned from Facebook

    process.nextTick(function() {

      User.findOne({ 'fb.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {

          var newUser = new User();

          newUser.fb.id           = profile.id;
          newUser.fb.access_token = access_token;
          newUser.fb.firstName    = profile.name.givenName;
          newUser.fb.lastName     = profile.name.familyName;
          newUser.fb.email        = profile.emails[0].value;


          newUser.save(function(err) {
            console.log(newUser);
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  // USER SIMPLE LOGIN
  passport.use('local-login', new LocalStrategy({
    usernameField :'email',
    passwordField : 'password',
    passReqToCallback : true
   }, function(req, email, password, callback){
    //search for a user with an email from the login form
    User.findOne({'local.email': email}, function(err, user){
      if(err) return callback(err);
      //if no user has been found
      if(!user) return callback(null, false, req.flash('loginMessage', 'oops user not found'));

      //check password
      if(!user.validPassword(password)) return callback(null, false, req.flash('loginMessage', 'oops wrong password'));

      //user has been authenticates, return user.
      return callback(null, user);
    });

  }));


  passport.use('local-signup', new LocalStrategy({
    usernameField :'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback){    
    process.nextTick(function(){
      //find a user with this email
      User.findOne({'email': email}, function(err, user){
        if(err) return callback(err)
          //if there is already and user with this email
        if (user) {
          // return callback(null, false, req.flash('signupMessage', 'this email is already in use'))
          console.log("ERROR user exists: " + user);
        } else{
          console.log("no user registered");
          //no user registred with this email
          //create a new user
          var newUser = new User();
          newUser.email = req.body.email;
          newUser.password = newUser.encrypt(req.body.password);
          
          newUser.save(function(err){
            console.log('hello guys')
            if(err) throw err;
            return callback(null, newUser);
          })
        }
      });
    });
  }));
}