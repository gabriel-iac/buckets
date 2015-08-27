var Extreme = Extreme || {};

Extreme.access_token = "access_token";

// var type = ;
// var url  = ;
// var data = ;

// Extreme.ajaxRequest(type, url, data, function(data){

// });

// QUESTION: Do you move this logic inside ui.loggedIn / ui.loggedOut
Extreme.init = function(){
  google.maps.event.addDomListener(window, 'load', Extreme.ui.map);

  var access_token = Extreme.readAccessToken;
  if (access_token) {
    Extreme.ui.loggedIn();

    // Decide which content to populate
    Extreme.ui.populateSelect();
    Extreme.getLocations();
    //Extreme.getMyLocations();
    Extreme.getSports();
    Extreme.getUsers();

  } else {
    Extreme.ui.loggedOut();

    // Must ensure content is removed
  }
}

Extreme.createAccessToken = function(token, days){
  var expires;

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  return document.cookie = Extreme.access_token + "=" + token + expires + "; path=/";
}

Extreme.readAccessToken = function(){
  var nameEQ = Extreme.access_token + "=";
  var ca = document.cookie.split(';');
  var c;
  var cookie;

  for(var i=0;i < ca.length;i++) {
    c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1,c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      cookie = c.substring(nameEQ.length, c.length);
      return cookie;
    }
  }
  return null;
}

Extreme.deleteAccessToken = function(){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

Extreme.ajaxRequest = function(type, url, data, done){
  var accessToken = Extreme.readAccessToken();

  $.ajax({
    type: type,
    url : url,
    data: data,
    dataType  : 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("x-access-token", accessToken);
    },
  }).done(function(data, response) {
    done(data)
  })
  .fail(function(data, response) {
    console.error(response);
  })
  .always(function(data, response) {
    // 
  });
}

Extreme.getCurrentUser = function(user){
  var type = "get";
  var url  = "/api/users/current?id="+ user.user.id;
  var user = null;

  Extreme.ajaxRequest(type, url, user, function(user){
    localStorage.setItem("user_first_name", user.first_name);
    localStorage.setItem("user_id", user._id);
    Extreme.ui.displayUser(user);
  }); 
}

Extreme.removeCurrentUser = function(user){
  localStorage.removeItem("user");
}

Extreme.getLocations = function(){
  var id   = "locations"
  var type = "get";
  var url  = "/api/" + id;
  var data = null;

  Extreme.ajaxRequest(type, url, data, function(data){
    Extreme.ui.displayLocations(data, id);
  });

}

Extreme.getUsers = function(){
  var id   = "users"
  var type = "get";
  var url  = "/api/" + id;
  var data = null;

  Extreme.ajaxRequest(type, url, data, function(data){
    Extreme.ui.displayUsers(data, id)
  });
}

Extreme.getSports = function(){
  var id   = "sports"
  var type = "get";
  var url  = "/api/" + id;
  var data = null;

  Extreme.ajaxRequest(type, url, data, function(data){
    Extreme.ui.displaySports(data, id);
  });
}

Extreme.getMyLocations = function(){
  alert("Getting my locations");
  var type = "get";
  var url  = "/api/users/mylocations/";
  var data = null;

  Extreme.ajaxRequest(type, url, data, function(data){
    Extreme.ui.displayLocations(data, id);
  });
}

Extreme.addLocation = function(){
  event.preventDefault();

  var access_token = Extreme.readAccessToken;
  if (access_token) {

    var location = $("#location").val();

    Extreme.geocoder.geocode({ 'address': location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        Extreme.map.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
          map: Extreme.map,
          position: results[0].geometry.location
        });
        
        Extreme.markers.push(marker);

        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        var sport = $('#sport-select option:selected').val();
        var image = $('#image').val();
        var description = $('#description').val();

        var creator = localStorage.getItem('user_id')
      
        console.log(description);

        var location_name = results[0].formatted_address
        console.log(location_name);

        // addLocation method
        var type = "post";
        var url  = "/api/locations";
        var data = {
          name: name,
          lat: lat,
          lng: lng,
          location_name: location_name,
          sport: sport,
          image:image,
          description: description,
          creator: creator
        };

        Extreme.ajaxRequest(type, url, data, function(data){
          console.log("Marker added.")
          // Extreme.getLocations();
          // Extreme.ui.toggleDisplays('locations');
        });
      };
    });
  }
}

Extreme.addToMyLocations = function(){
  var currentUserId = localStorage.getItem("user_id");
  
  if(this.style.backgroundColor == 'red'){
    $(this).css('background-color', '#337AB7')
  }else{
    $(this).css('background-color', 'red');
  }

  var type = "post";
  var url  = "/api/users/addlocation";
  var data = {
    user_id   : currentUserId,
    locationId: this.id
  };

  Extreme.ajaxRequest(type, url, data, function(user){
    Extreme.getMyLocations();
  });
}

Extreme.bindEvents = function(){
  $("#signup-form").on("submit", Extreme.signup);
  $("#login-form").on("submit", Extreme.login);
  $("#logout-btn").on("click", Extreme.logout);
  $(".nav li a").on("click", Extreme.ui.toggleTab);
  $("#submitLocation").on('click', Extreme.addLocation);
  $("body").on('click', ".add-to-list-btn", Extreme.addToMyLocations);
}

Extreme.signup = function(){
  event.preventDefault();

  var type = "post";
  var url  = $(this).attr("action");
  var data = {
    email: $("#signup-email").val(),
    password: $("#signup-password").val(),
    first_name: $("#first_name").val(),
    last_name: $("#last_name").val()
  };

  Extreme.ajaxRequest(type, url, data, function(data){
    Extreme.getCurrentUser(data);
    Extreme.createAccessToken(data.token)
    Extreme.ui.loggedIn();
  });
}

Extreme.login = function() {
  event.preventDefault();

  var type = "post";
  var url  = $(this).attr("action");
  var data = {
    email: $("#login-email").val(),
    password: $("#login-password").val()
  };

  Extreme.ajaxRequest(type, url, data, function(data){
    Extreme.getCurrentUser(data);
    Extreme.createAccessToken(data.token)
    Extreme.ui.loggedIn();
  });
}

Extreme.logout = function() {
  event.preventDefault();

  Extreme.deleteAccessToken();
  Extreme.removeCurrentUser();
  Extreme.ui.loggedOut();
}

Extreme.ui = {};

Extreme.ui.map = function() {
  var places;
  var lat = 44.5403;
  var long = -78.5463;
  var mapCanvas = document.getElementById('map');

  Extreme.markers = [];

  Extreme.geocoder = new google.maps.Geocoder();

  var mapOptions = {
    center: new google.maps.LatLng(lat, long),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  Extreme.map = new google.maps.Map(mapCanvas, mapOptions);
}

Extreme.ui.toggleDisplays = function(id){

  $('.tab').slideUp(1000);
  $("#" + id).toggle(1000);
  google.maps.event.trigger(map, "resize");
}

Extreme.ui.toggleTab = function(){
  var tab = $(this).data("id");  
  Extreme.ui.toggleDisplays(tab);
  google.maps.event.trigger(map, "resize");
}

Extreme.ui.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

Extreme.ui.displayUser = function(user){
  var first_name = Extreme.ui.capitalize(user.first_name) || "User";

  $("#logout-btn").parent().before("<li id='profile-btn'><a href='#'>" + first_name + "</a></li>");
  $("#welcome h1").append(" " + first_name + "!");
}

Extreme.ui.displayUsers = function(data, tab){
  for(var i=0; i < data.length; i++){
    $("#" + tab + "-list").append("<li>" + data[i].first_name + "</li>");
  } 
}

Extreme.ui.displaySports = function(data, tab){
  for(var i=0; i < data.length; i++){
    $("#" + tab + "-list").append("<li>" + data[i].name + "</li>");
  } 
}
// " + data[i].image +"
Extreme.ui.displayLocations = function(data, tab){
  for(var i=0; i < data.length; i++){
    console.log(data[i].image)
    $("#" + tab + "-list").append(
      "<li class='col-md-4 locations-box '>"+
        "<ul class='location-wrapper effect1'>"+ 
        "<div><img class='img-rounded' src='http://lorempixel.com/400/200/city'></div>"+
        "<div class='text-container'>"+
          "<li class='title'>"+"<h4>" + data[i].location_name + "</h4>"+"</li>"+
          "<li class='creator'>" + " " +"<em>" + data[i].creator.first_name + "</em>"+"</li>"+
          "<li>"+ "Sport:" + " " + data[i].sport.name +"</li>"+
          "<li>"+ "Description:" + " " + data[i].description +"</li>"+
          "<li>"+ "Users:" + " " + data[i].users +"</li>"+
          "<li><button class='add-to-list-btn btn btn-primary' id=" + data[i]._id + ">Add to list</button></li>"+
        "</ul>"+
        "</div>"+
      "</li>"
    );
  }; 
};

// NOT DRY!
Extreme.ui.populateSelect = function(id){
  var select = $(id + "-select");
  var id   = "sports"
  var type = "get";
  var url  = "/api/" + id;
  var data = null;

  Extreme.ajaxRequest(type, url, data, function(data){
    $.each(data, function(index, sport){
      $("#sport-select").append("<option value='" + sport._id + "'>"+ sport.name +"</option>");
    })
  });
};

Extreme.ui.loggedIn = function(){
  $("[data-id='login'], [data-id='signup']").parent().hide();
  $("[data-id='logout']").parent().show();
  Extreme.ui.toggleDisplays("locations");
}

Extreme.ui.loggedOut = function(){

  $("[data-id='login'], [data-id='signup']").parent().show();
  $("[data-id='logout']").parent().hide();
  $("#profile-btn").remove();
  $("#welcome h1").text("Welcome");
  //Extreme.ui.toggleDisplays("home").show();

}

$(function(){
  Extreme.init();
  Extreme.bindEvents();
});