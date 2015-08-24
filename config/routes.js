var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var usersController = require('../controllers/users');
var locationController = require('../controllers/locations');
var router = express.Router();




router.route('/locations')
  .get(locationController.getAllLocations)
  

router.route('/locations/new')
  .get(locationController.getNewLocation)

router.route('/users')
.get(usersController.getAllUsers);

  
router.route('/users/:id')
  .put(usersController.updateUser)

router.route('/users/:id')
  .get(usersController.showUser)


router.route('/locations/:id')
.get(locationController.getLocation);


router.route('/locations/:id')
.put(locationController.updateLocation);


router.route('/locations')
.post(locationController.createLocation)




module.exports = router;


