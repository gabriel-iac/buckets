function User(){

  this.getUsers = function(userToken){
    console.log("Getting users");

    //ajax call to get users 
     $.ajax({
      url       : '/api/users',
      dataType  : 'json',
      beforeSend: function(xhr){
        //if(''){
          xhr.setRequestHeader("x-access-token", userToken);
        //}
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

  this.createUser = function(){

  }

}