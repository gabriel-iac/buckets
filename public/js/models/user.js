function User(){

  this.getUsers = function(){
    console.log("Getting users");

    //ajax call to get users 
     $.ajax({
      url       : '/api/users',
      dataType  : 'json',
      beforeSend: function(xhr){
        //if(''){
          xhr.setRequestHeader("x-access-token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWRjMzcyNWI0M2IyMmI4NGI4MDY5ZmQiLCJmaXJzdF9uYW1lIjoiR2FicmllbGUiLCJsYXN0X25hbWUiOiJJYWNvcGV0dGkiLCJpbWFnZSI6ImltYWdlIiwiZW1haWwiOiJnYWJAZ2FiLmNvbSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJfX3YiOjAsImxvY2F0aW9ucyI6W119.T61ZwiumFk6LYeknJ8f7FqqZlPRQQgrOjIugiS70BlA");
        //}
      },
      error: function(){
        //handle error
      },
      success: function(data){
        //return a list of users
        console.log(data);
        return data;
      }
     });
     
  }

  this.createUser = function(){

  }

}