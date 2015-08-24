var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 9000; 
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var morgan = require('morgan');
var mongoose = require('mongoose');
var expressLayouts = require('express-ejs-layouts');

mongoose.connect('mongodb://localhost/buckets')

post('/',function(req,res))

get('/'), function()
{
  
}
