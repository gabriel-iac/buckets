function initialize() {
  var mapCanvas = document.getElementById('map');
  var lat = 44.5403;
  var long = -78.5463;
  var position = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    center: new google.maps.LatLng(lat, long),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  var map = new google.maps.Map(mapCanvas, mapOptions);

  var marker = new google.maps.Marker({
         position: new google.maps.LatLng(lat, long),
         map: map,
         title:"This is the place."

})
}






