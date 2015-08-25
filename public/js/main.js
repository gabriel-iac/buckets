function MainController(){
  this.user = new User();
}

MainController.prototype.init = function(){ 
}

MainController.prototype.getUsers = function(){
  return this.user.getUsers();
}




$(function(){

  var mainController = mainController || new MainController();

  $("#users").append("<li>" + mainController.getUsers() + "</li>");

});