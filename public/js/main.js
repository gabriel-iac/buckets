function MainController(){
  this.user     = new User();
  this.sport    = new Sport();
  this.loc      = new Location();
  this.country  = new Country();
}

MainController.prototype.init = function(){
  window.mainController.getUsers();
  window.mainController.getLocations();
  window.mainController.getSports();
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
}

// MainController.prototype.createLocation = function(){
//   return this.loc.createLocation(this.userToken);
// }


$(function(){
  window.mainController = window.mainController || new MainController();
  window.mainController.init();
  window.mainController.user.bindEvents();
});