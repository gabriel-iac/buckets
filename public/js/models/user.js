function User(){

  this.getUsers = function(){
    console.log("Getting users");
    
    //ajax call to get users
     $.ajax({
      url       : '/api/users',
      dataType  : 'json',
      beforeSend: function(xhr){
        if($window.sessionStorage.token){
          xhr.setRequestHeader("Authorization", "Bearer " + $window.sessionStorage.token);
        }
      },
      error: function(){
        //handle error
      },
      success: function(data){
        //return a list of users
        return data;
      }

     });
  }

  this.createUser = function(){

  }

}