function MainController(){
  this.user = new User();
}

MainController.prototype.init = function(){ 
  //if user is logged in get token
  this.userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWRjMzcyNWI0M2IyMmI4NGI4MDY5ZmQiLCJmaXJzdF9uYW1lIjoiR2FicmllbGUiLCJsYXN0X25hbWUiOiJJYWNvcGV0dGkiLCJpbWFnZSI6ImltYWdlIiwiZW1haWwiOiJnYWJAZ2FiLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJfX3YiOjAsImxvY2F0aW9ucyI6W119.T61ZwiumFk6LYeknJ8f7FqqZlPRQQgrOjIugiS70BlA";
}

MainController.prototype.getUsers = function(){
  return this.user.getUsers(this.userToken);
}


$(function(){
  var mainController = mainController || new MainController();
  
  mainController.init();
  mainController.getUsers();
});