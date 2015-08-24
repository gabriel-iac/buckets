var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var usersController = require('../controllers/users');
var locationController = require('../controllers/locations');

var router = express.Router();

router.route('/users')
  .get(usersController.home);

router.route('/locations')
  .get(locationController.getAllLocations)
  
// locationRouter.route('/locations/new')
//   .get(locationController.getNewLocation)

router.route('/locations')
  .post(locationController.createLocation)

// module.exports = {
//   locationRouter: locationRouter, 
//   userRouter: userRouter
// }

module.exports = router;