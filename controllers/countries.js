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

function getCountries(req, res){
  var countries = Country.find({} , function(err, locations){
    res.json(countries);
  }); 
}

module.exports = {
 createCountry: createCountry,
 getCountries: getCountries
}