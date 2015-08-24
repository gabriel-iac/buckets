var express = require('express');
var userRouter = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var usersController = require('../controllers/users');
var locationController = require('../controllers/locations')
var locationRouter = express.Router();

userRouter.route('/users')
  .get(usersController.home);


// locationRouter.route('/locations')
//   .get(locationController.getAllLocations)
  
  // locationRouter.route('/locations/new')
  //   .get(locationController.getNewLocation)

locationRouter.route('/locations')
  .get(locationController.getLocation)
  .post(locationController.createLocation)

  module.exports = locationRouter
    // userRouter: userRouter
 
