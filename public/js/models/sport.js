function Sport(){
  
  this.getSports = function(userToken){
    console.log("Getting sports");

    //ajax call to get sports 
     $.ajax({
      url       : '/api/sports',
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
        //return a list of locations
        console.log(data);
        for(var i=0; i<data.length; i++){
          $("#sports").append("<li>" + data[i].name + "</li>");
        } 
      }
     });
  }

}