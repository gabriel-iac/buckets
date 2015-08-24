var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var usersController = require('../controllers/users');
var locationController = require('../controllers/locations');
var router = express.Router();


router.route('/users')
.get(usersController.getAllUsers);

router.route('/users')
.post(usersController.createUser);

router.route('/locations')
.get(locationController.getAllLocations)

router.route('/locations/:id')
.get(locationController.getLocation)

router.route('/locations/:id')
.put(locationController.updateLocation)

// locationRouter.route('/locations/new')
//   .get(locationController.getNewLocation)

router.route('/locations')
.post(locationController.createLocation)

// module.exports = {
//   locationRouter: locationRouter, 
//   userRouter: userRouter
// }

module.exports = router;