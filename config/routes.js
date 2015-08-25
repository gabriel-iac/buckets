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


router.route('/users')
.post(usersController.createUser)

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
console.log(req.body.email);
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, "iloveextremesport", {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

router.use(function(req, res, next) {

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
});

//USERS
router.route('/users')
.get(usersController.getAllUsers)


router.route('/users/:id')
.put(usersController.updateUser)

router.route('/users/:id')
.get(usersController.showUser)

// API routes

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
  .post(sportController.createSport)

//Country

router.route('/countries')
  .post(countryController.createCountry)



module.exports = router;


