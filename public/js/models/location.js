function Location(){
  
  this.getLocations = function(userToken, sport_id){
    console.log("Getting lcoations");

    //ajax call to get users 
     $.ajax({
      url       : '/api/locations',
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
          $("#locations").append("<li>" + data[i].name + "</li>");
        } 
      }
     });
  }

}