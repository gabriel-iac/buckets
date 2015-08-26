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
    url       : '/api/users/current?id='+id,
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
        email: $("#email").val(),
        password: $("#password").val()
      },
    }).done(function(data){
      // console.log("The token that we're going to save to document.cookie or localStorage) is: ", data.token);
      console.log(data);
      console.log(this.getUser(data.token))

      window.mainController.bake("access_token", data.token);
      window.mainController.init();

      $("#login-btn, #signup-btn").parent().hide();
      $(".ajax-log, .ajax-sign").hide();
      $("#logout-btn").parent().show();
    });
  })

  this.displayUser = function(data) {
    window.mainController.user.getUser(data.token, data.user.id, function(user){
      console.log(user.fb.firstName);      
      localStorage.setItem("user", user);
      $("#logout-btn").parent().prepend("<li>"+user.fb.firstName+"</li>");
    }); 
  }

  $("body").on("submit", "#login", function(){
    event.preventDefault();
    $.ajax({
      type: "post",
      url: $(this).attr("action"),
      dataType: "json",
      data: {
        email: $("#email").val(),
        password: $("#password").val()
      },
    }).done(function(data){
      // console.log("The token that we're going to save to document.cookie or localStorage) is: ", data.token);

      window.mainController.user.displayUser(data);
      window.mainController.bake("access_token", data.token);
      window.mainController.init();

      $("#login-btn, #signup-btn").parent().hide();
      $(".ajax-log, .ajax-sign").hide();
      $("#logout-btn").parent().show();
    });
  })

  $("body").on("click", "#login-btn", function(){
    event.preventDefault();
    $(".ajax-sign").hide(function(){
      $(".ajax-log").fadeToggle();
    });
  });

  $("body").on("click", "#signup-btn", function(){
    event.preventDefault();
    $(".ajax-log").hide(function(){
      $(".ajax-sign").fadeToggle();
    });
  });

  $("body").on("click", "#logout-btn", function(){
    event.preventDefault();
    window.mainController.unbake("access_token");

    $("#login-btn, #signup-btn").parent().show();
    $("#logout-btn").parent().hide();
    window.mainController.init();
    localStorage.removeItem("user");
  }); 
}
}