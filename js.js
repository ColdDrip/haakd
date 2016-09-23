$(document).ready(function(){
  console.log("test");

  //initialise draggables
  $(".button").draggable({revert:true});
  //  $(".button").hover(function(){
  //    console.log($(this).attr("class").split(' ')[1]);
  //  });


  //prevent form submit on adding a dream
  $('#newDreamForm').submit(function (e) {
  });
});
