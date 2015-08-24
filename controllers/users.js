var mongoose = require('mongoose');
var userRouter = express.Router();

userRouter.get('/', function(req, res){

  res.render('users/index')
}) 