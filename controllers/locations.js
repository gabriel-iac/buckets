var Location = require('../models/location')

function getAllLocations(req, res){
res.send("Locations here");

}


// function getNewLocation(req, res){
//   var 

// }

function createLocation(req, res){
  console.log(req.body);
  //create new location object
  //save the location
  //add to db
  //render the object to json
  // var newlocation = new location(req.body);
  // newlocation.name = req.body.name,
  // newlocation.country = req.body.country,
  // newlocation.sports = req.body.sports,
  // newlocation.long = req.body.long,
  // newlocation.lat = req.body.lat,
  // newlocation.image = req.body.image

  //   newlocation.save(function(err){
  //     if(err){console.log(err)}
  //       else{
  //         res.json(newlocation);
  //       }

  //   })
res.json({ message:"Lcoation created" })

}

function getlocation(req, res){


}

module.exports = {
  getAllLocations: getAllLocations,
  createLocation: createLocation
}