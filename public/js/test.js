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
  $("#all_locations table tbody").html("");
  $.get('/posts.json')
  .done(function(data){
    $.each(data, function(index, item){
     var row = $("<tr>"+
      "<td>" + item.title+"</td>"+
      "<td>" + item.description+"</td>"+
      "<td>" + item.author +"</td>"+
      "<td><a href='http://www.twitter.com/" + item.twitter +"'>@" + item.twitter +"</a></td>"+
      "<td>" + item.published_at+"</td>"+
      "<td><button data-id='" + item.id+"' class='btn edit_post'>Edit</button> <button data-id='" + item.id+"' class='btn btn-danger delete_post'>Delete</button></td>"+
      "</tr>");

     row.appendTo("#all_locations table tbody")
   })
  })
}


LocationAjax.initialize = function(){
  $('a#new_post_link, a#all_locations_link').on('click', function(){
    event.preventDefault();
    var show_page = $(this).attr("id").replace("_link", "");
    LocationAjax.togglePages("#"+ show_page);
  })

  LocationAjax.getLocations();

  $('#post_form').on("submit", LocationAjax.locationForm);
}


$(function(){
  LocationAjax.initialize();

})