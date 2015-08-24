var Location = require('../models/location');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function getAllLocations(req, res){
  var locations = Location.find({} , function(err, locations){
    res.json(locations);
  }); 
};

function getNewLocation(req,res){
  console.log('hello')
  res.render('locations/new');
};

<<<<<<< HEAD
// function createLocation(req, res){
//   create new location object
//   save the location
//   add to db
//   render the object to json
//   var newlocation = new location(req.body);
//   newlocation.name = req.body.name,
//   newlocation.country = req.body.country,
//   newlocation.sports = req.body.sports,
//   newlocation.long = req.body.long,
//   newlocation.lat = req.body.lat,
//   newlocation.image = req.body.image

//     newlocation.save(function(err){
//       if(err){console.log(err)}
//         else{
//           res.json(newlocation);
//         }

//     })
// res.render('hello world')

// }

function getLocation(req, res){
res.render('users/index')
=======
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
        };
    });
};

function getLocation(req, res){
   Location.findById(req.params.id, function(err, location){
    res.json(location)
  });
};


module.exports = {
  getAllLocations: getAllLocations,
  createLocation: createLocation,
  getLocation: getLocation,
  getNewLocation: getNewLocation
}