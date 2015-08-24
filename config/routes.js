var express = require('express');
var userRouter = express.Router();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var usersController = require('../controllers/users');


userRouter.route('/users')
  .get(usersController.home);


module.exports = userRouter