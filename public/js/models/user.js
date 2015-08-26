function User(){

  this.getUsers = function(userToken){
    console.log("Getting users");

    //ajax call to get users 
     $.ajax({
      url       : '/api/users',
      dataType  : 'json',
      beforeSend: function(xhr){
        xhr.setRequestHeader("x-access-token", userToken);
      },
      error: function(){
        //handle error
      },
      success: function(data){
        //return a list of users
        console.log(data);

        for(var i=0; i<data.length; i++){

          $("#users").append("<li>" + data[i].first_name + "</li>");
        } 
      }
     });
  }



  this.getUser = function(userToken){
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
        console.log("The token that we're going to save to document.cookie or localStorage) is: ", data.token);
        window.mainController.bake("access_token", data.token);
        window.mainController.init();

        $("#login-btn, #signup-btn").parent().hide();
        $(".ajax-log, .ajax-sign").hide();
        $("#logout-btn").parent().show();
      });
    })

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
        console.log("The token that we're going to save to document.cookie or localStorage) is: ", data.token);
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
    }); 
  }
}