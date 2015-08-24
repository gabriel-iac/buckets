var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 3000; 
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var morgan = require('morgan');
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');
var router = express.Router();
var userRouter = express.Router();
var locationRouter = express.Router();
mongoose.connect('mongodb://localhost/buckets');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


app.set('layout', 'layout');
app.set("views", "./views");
app.set("view engine", "ejs");

app.get('/', function(req, res){
  res.render('layout');

})

var routes = require('./config/routes');
app.use("/", routes);

app.listen(port, function(){
  console.log('listening on port 3000')
})