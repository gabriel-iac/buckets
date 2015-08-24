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
.get(usersController.getAllUsers);


router.route('/users/:id')
.put(usersController.updateUser)

router.route('/users/:id')
.get(usersController.showUser)



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


