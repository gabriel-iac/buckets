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
    localStorage.setItem("user", user);
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

}

Extreme.getLocationsBySport = function(){

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
        var sport = $('#select_sport option:selected').val();
      
        console.log(sport)
        console.log(lat);
        console.log(lng);

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
          sport: sport
        };

        Extreme.ajaxRequest(type, url, data, function(data){
          console.log("Marker added.")
        });
      };
    });
  }
}

Extreme.bindEvents = function(){
  $("#signup-form").on("submit", Extreme.signup);
  $("#login-form").on("submit", Extreme.login);
  $("#logout-btn").on("click", Extreme.logout);
  $(".nav li a").on("click", Extreme.ui.toggleTab);
  $("#submitLocation").on('click', Extreme.addLocation);
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
  $('.tab').slideUp();
  $("#" + id).slideDown();
}

Extreme.ui.toggleTab = function(){
  var tab = $(this).data("id");  
  Extreme.ui.toggleDisplays(tab);

  // Might need to adjust logic
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

Extreme.ui.displayLocations = function(data, tab){
  console.log(data)
  for(var i=0; i < data.length; i++){
    $("#" + tab + "-list").append(
      "<li>"+
        "<ul>"+
          "<li>" + data[i].location_name +"</li>"+
          "<li>" + data[i].sport.name +"</li>"+
          "<li><img src='" + data[i].image +"'></li>"+
          "<li>" + data[i].users +"</li>"+
          "<li>" + data[i].creator.first_name +"</li>"+
          "<li><button class='add-to-list-btn' id=" + data[i]._id + ">Add to list</button></li>"+
        "</ul>"+
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
      select.append("<option value=' + sport.id +'>"+ sport.name +"</option>");
    })
  });
};

Extreme.ui.loggedIn = function(){
  $("[data-id='login'], [data-id='signup']").parent().hide();
  $("[data-id='logout']").parent().show();
  Extreme.ui.toggleDisplays("welcome");
}

Extreme.ui.loggedOut = function(){
  $("[data-id='login'], [data-id='signup']").parent().show();
  $("[data-id='logout']").parent().hide();
  $("[data-id='profile']").remove();
  $("#welcome h1").text("Welcome");
  Extreme.ui.toggleDisplays("home");
}

$(function(){
  Extreme.init();
  Extreme.bindEvents();
});