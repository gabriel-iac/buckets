var Location = require('../models/location');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
function getAllLocations(req, res){
res.send("Locations here");

}


// function getNewLocation(req, res){
//   var 

// }

function createLocation(req, res){
  //create new location object
  //save the location
  //add to db
  // render the object to json
  console.log(req.body);
  var newlocation = new Location(req.body);
    newlocation.save(function(err){
      if(err){console.log(err)}
        else{
          res.json(newlocation);
        }
    })
}

function getlocation(req, res){


}

module.exports = {
  getAllLocations: getAllLocations,
  createLocation: createLocation
}