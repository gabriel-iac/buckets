LocationAjax =  {};

LocationAjax.fields = ["title", "description", "author", "twitter", "published_at" ]

LocationAjax.togglePages = function(id1){
  id2 = (id1 == "#new_location" ? "#all_locations" : "#new_location")
  $(id2).slideUp(function(){$(id1).slideDown()})

}


LocationAjax.locationForm = function(){
  event.preventDefault();
  data = {}
  $.each(LocationAjax.fields, function(i, field){
    data[field] = $("#" + field).val();
  })

$.ajax({
  type: "POST",
  url: "/",
  data: {post: data},
  dataType: "json"
}).done(function(){
  LocationAjax.getLocations()
  LocationAjax.togglePages('#all_locations')
})
}

LocationAjax.getLocations = function(){
  $("#location-listing").html("");
  $.get('/api/locations')
  .done(function(data){
    $.each(data, function(index, item){
      console.log(item);
     var list = $("<ul>"+
      "<li>" + item.location_name+"</li>"+
      "<li>" + item.country+"</li>"+
      "<li>" + item.sport +"</li>"+
      "<li>" + item.image+"</li>"+
      "<li>" + item.users+"</li>"+
      "<li>" + item.creator+"</li>"+
      "<li><button class='add-to-list-btn' id="+item._id +">Add to list</button></li>"+
      "</ul>");

     list.appendTo("#location-listing")
   })
  })
}


LocationAjax.initialize = function(){
  $('a#new_location, a#all_locations').on('click', function(){
    event.preventDefault();
    var show_page = $(this).attr("id").replace("_link", "");
    LocationAjax.togglePages("#"+ show_page);
  })

  LocationAjax.getLocations();

  $('#post_form').on("submit", LocationAjax.locationForm);
}

function addToMyList(location_id){
  alert(location_id);
}


$(function(){
  LocationAjax.initialize();

})