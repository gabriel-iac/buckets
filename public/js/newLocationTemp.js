$(function(){
$("#location_submit").on("click", function(){
  event.preventDefault();
  $.ajax({
    type: "post",
    url: "http://localhost:3000/locations",
    data: $("#form_location").serialize()
  }).done(function(data){
    alert("location created")
  })
})



})