function User(){

  this.getUsers = function(userToken){
   $.ajax({
    url       : '/api/users/',
    dataType  : 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("x-access-token", userToken);
    },
    error: function(){
        //handle error
      },
      success: function(data){
        //return a list of users
        for(var i=0; i<data.length; i++){
          $("#user").append("<li>" +  + "</li>");
        } 
      }
    });
 }

 this.getUser = function(userToken, id, callback){
  $.ajax({
    url       : '/api/users/current?id='+ id,
    dataType  : 'json',
    beforeSend: function(xhr){
      xhr.setRequestHeader("x-access-token", userToken);
    },
    error: function(){
       //handle error
    },
    success: function(data){
      callback(data);
    }
  });
 }

 this.bindEvents = function(){
  $("body").on("submit", "#signup", function(){
    event.preventDefault();
    $.ajax({
      type: "post",
      url: $(this).attr("action"),
      dataType: "json",
      data: {
        email: $("#signup-email").val(),
        password: $("#signup-password").val(),
        first_name: $("#first_name").val(),
        last_name: $("#last_name").val()
      },
    }).done(function(data){
      // console.log("The token that we're going to save to document.cookie or localStorage) is: ", data.token);
      console.log(data);
           
      window.mainController.bake("access_token", data.token);
      window.mainController.init();

      $("#login-btn, #signup-btn").parent().hide();

      toggleDisplays(all_locations);
      $("#logout-btn").parent().show();
    });
  })

  this.displayUser = function(data) {
    window.mainController.user.getUser(data.token, data.user.id, function(user){
      console.log(user.first_name);      
      localStorage.setItem("user", user);
      // $("#logout-btn").parent().prepend("<li>"+user.first_name+"</li>");
    }); 
  }

  $("body").on("submit", "#login", function(){
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
      // console.log("The token that we're going to save to document.cookie or localStorage) is: ", data.token);

      window.mainController.user.displayUser(data);
      window.mainController.bake("access_token", data.token);
      window.mainController.init();

      $("#login-btn, #signup-btn").parent().hide();
      toggleDisplays("sports-div");
      $("#logout-btn").parent().show();

    });
  })

  function toggleDisplays(id){
    $('.tab').slideUp()
    $("#" + id).slideDown()
  }

  $("body").on("click", "#home-btn", function(){
    event.preventDefault();
    toggleDisplays('sports-div')
  });

  $("body").on("click", "#login-btn", function(){
    event.preventDefault();
    toggleDisplays('login-div')
  });

  $("body").on("click", "#signup-btn", function(){
    event.preventDefault();
    toggleDisplays('signup-div')
  });

  $("body").on("click", "#new-btn", function(){
    event.preventDefault();
    toggleDisplays('new_location')
  });

  $("body").on("click", "#locations-btn", function(){
    event.preventDefault();
    toggleDisplays('all_locations')
  });

  $("body").on("click", "#logout-btn", function(){
    event.preventDefault();
    window.mainController.unbake("access_token");

    $("#login-btn, #signup-btn").parent().show();
    $("#logout-btn").parent().hide();
    toggleDisplays("home");
    window.mainController.init();
    localStorage.removeItem("user");
  }); 
}
}