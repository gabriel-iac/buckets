var Country = require('../models/country');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function createCountry(req, res){
  var newCountry = new Country(req.body);
    newCountry.save(function(err){
      if(err){console.log(err)}
        else{
          res.json(newCountry);
        };
    });
};

module.exports = {
 createCountry: createCountry
}