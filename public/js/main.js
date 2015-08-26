function MainController(){
  this.user     = new User();
  this.sport    = new Sport();
  this.loc      = new Location();
  this.country  = new Country();
}

MainController.prototype.init = function(){
<<<<<<< HEAD
  var access_token = this.eat("access_token");
  if (access_token) {
    window.mainController.getUsers();
    window.mainController.getLocations();
    window.mainController.getSports();
  } else {
    console.log("clear pages...")
  }
=======
  this.getUsers();
  this.getLocations();
  this.getSports();
}

MainController.prototype.getUsers = function(){
  var access_token = this.eat("access_token");
  if (access_token) return this.user.getUsers(access_token);
}

MainController.prototype.getLocations = function(){
  var access_token = this.eat("access_token");
  if (access_token) return this.loc.getLocations(access_token);
}

MainController.prototype.getSports = function(){
  var access_token = this.eat("access_token");
  if (access_token) return this.sport.getSports(access_token);
>>>>>>> e1d2ab7d98a263e2b65018493578dac47eed4178
}

MainController.prototype.bake = function(name, value, days){
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    expires = "; expires="+date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie = name+"="+value+expires+"; path=/";
}

MainController.prototype.unbake = function(name){
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

MainController.prototype.eat = function(name){
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1,c.length);
    }
    if (c.indexOf(nameEQ) === 0) {
      var cookie = c.substring(nameEQ.length, c.length);
      console.log(cookie);
      return cookie;
    }
  }
  return null;
}

MainController.prototype.bindEvents = function(){
  $("#signup").on("submit", function(){
    event.preventDefault();
    $.ajax({
      type: "post",
      url: $(this).attr("action"),
      dataType: "json",
      data: {
        email: $("#signup-email").val(),
        password: $("#signup-password").val()
      },
    }).done(function(data){
      console.log("The token that we're going to save to document.cookie or localStorage) is: ", data.token);
      mainController.bake("access_token", data.token);
      mainController.init();
    });
  })

  $("#login").on("submit", function(){
    event.preventDefault();
    $.ajax({
      type: "post",
      url: $(this).attr("action"),
      dataType: "json",
      data: {
        email: $("#login-email").val(),
        password: $("#login-password").val()
      },
    }).done(function(data){
      console.log("The token that we're going to save to document.cookie or localStorage) is: ", data.token);
      mainController.bake("access_token", data.token);
      mainController.init();
    });
  })
}

$(function(){
  mainController = new MainController();
  mainController.bindEvents();
 // mainController.init();
});