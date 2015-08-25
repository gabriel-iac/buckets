var geocoder;
var map;
var places;
var markers = [];


function initialize() {
// Create the Geocoder
geocoder = new google.maps.Geocoder();

var lat = 44.5403;
var long = -78.5463;



// Set map options
var mapOptions = {
  center: new google.maps.LatLng(lat, long),
  zoom: 8,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}


// Create the map ref the map canvas
var mapCanvas = document.getElementById('map');


var map = new google.maps.Map(mapCanvas, mapOptions);


// Fetch the places using ajax and put them on the map
// fetchplaces() - FUNCTION THAT WE CALL LATER


 //  var marker = new google.maps.Marker({
 //   position: new google.maps.LatLng(lat, long),
 //   map: map,
 //   title:"This is the place."

 // })




 //  google.maps.event.addListener(marker, 'click', function() {
 //    infowindow.open(map,marker);
 //  });


$("#submitLocation").on('click',function(){
  event.preventDefault()
  var loc = $("#location").val();
  console.log(loc);

  geocoder.geocode( { 'address': loc }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        // log out results from geocoding
        console.log(results);
        map.setCenter(results[0].geometry.location); }})


})

}






var fetchPlaces = function() {

  var contentString = 'This is really fun for going skating';

  var infowindow = new google.maps.InfoWindow({
    content: ''
  });

}



