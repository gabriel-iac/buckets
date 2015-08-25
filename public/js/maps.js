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


$("#submitLocation").on('click',function(){
  event.preventDefault()
  var loc = $("#location").val();
  console.log(loc);

  geocoder.geocode( { 'address': loc }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        // log out results from geocoding
        console.log(results);
        map.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        markers.push(marker);

    // .lat and lng return degrees from the google api
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        console.log(lat);
        console.log(lng);
        var location_name = results[0].formatted_address
        console.log(location_name);

      }})

  })

}
