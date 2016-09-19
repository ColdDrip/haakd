$(document).ready(function(){
  console.log("test");

  //initialise draggables
  $(".button").draggable({revert:true});


  //prevent form submit on adding a dream
  $('#newDreamForm').submit(function (e) {
  });
});
