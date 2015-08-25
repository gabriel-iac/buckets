var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var usersController = require('../controllers/users');
var locationController = require('../controllers/locations');
var sportController = require('../controllers/sports');
var countryController = require('../controllers/countries');
var router = express.Router();


//USERS
router.route('/users')
.get(usersController.getAllUsers)
.post(usersController.createUser)

router.route('/users/:id')
.put(usersController.updateUser)

router.route('/users/:id')
.get(usersController.showUser)

// API routes

// route to show a random message (GET http://localhost:8080/api/)
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

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
        var token = jwt.sign(user, app.get('superSecret'), {
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


