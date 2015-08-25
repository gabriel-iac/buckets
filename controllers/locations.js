var Location = require('../models/location');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

function getAllLocations(req, res){
  var locations = Location.find({} , function(err, locations){
    res.json(locations);
  }); 
};

function getNewLocation(req,res){
  res.render('locations/new');
};

function createLocation(req, res){
  console.log(req.body);
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



function updateLocation(req, res){
  Location.findByIdAndUpdate(req.params.id, req.body,function(err, location){
    if(err)
      res.send(err)
   res.json({'message': 'location update' })
  })
}


function editLocation(req, res){


}


module.exports = {
  getAllLocations: getAllLocations,
  createLocation: createLocation,
  getLocation: getLocation,
  updateLocation: updateLocation,
  getNewLocation: getNewLocation

}