var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var usersController = require('../controllers/users');
var locationController = require('../controllers/locations');
var sportController = require('../controllers/sports');
var countryController = require('../controllers/countries');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');


router.route('/locations')
.get(locationController.getAllLocations)

router.route('/users')
  .post(usersController.postSignup)

router.route("/logout").get(function (req, res, next) {
  delete req.user;    
  return res.status(200).json({
    "message": "User has been successfully logged out"
  });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', authenticate);

router.use('/api', expressJWT({secret: "iloveextremesport"}));

router.use(decode);

//USERS
router.route('/users')
  .get(usersController.getAllUsers)

router.route('/users/current')
  .get(usersController.getCurrentUser)  

router.route('/users/:id')
  .put(usersController.updateUser)

router.route('/users/:id')
  .get(usersController.showUser)

// route to show a random message (GET http://localhost:8080/api/)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});


//LOCATIONS

router.route('/locations')
.get(locationController.getAllLocations)


router.route('/locations/new')
.get(locationController.getNewLocation)


router.route('/locations/:id')
.get(locationController.getLocation);


router.route('/locations/:id')
.put(locationController.updateLocation);


router.route('/locations')
.post(locationController.createLocation)

//SPORT

router.route('/sports')
.get(sportController.getSports)
.post(sportController.createSport)


//POPULATE
router.route('/sports/populate')
.get(sportController.populateLocations)

//Country

router.route('/countries')
.post(countryController.createCountry)

function decode(req, res, next) {
  console.log("Checking the token");

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, "iloveextremesport", function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
      success: false, 
      message: 'No token provided.' 
    });
  }
}

function authenticate(req, res) {
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {


      //if (user.password != req.body.password) {
      if (!user.validPassword(req.body.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, "iloveextremesport", {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        var user = {
          id: user._id,
        }

        //send back the token to the front-end to store in a cookie
        res.status(200).send({ 
          message: "Thanks for authenticating",
          token: token,
          user: user
        });
      }   
    }
  });
}

module.exports = router;


