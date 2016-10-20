$(document).ready(function(){
  var orbs;

  $.ajax({
		type: "GET",
		url: "../lib/get_orbs.php",
		success: function(data) {
			orbs = JSON.parse(data, ",");
		},
		error: function (err){
			console.log("error:"+err);
		}
	});

$('#about1').click(function(){
  $('#about').modal({keyboard: false});
});

$('#how_it_works1').click(function(){
  $('#how_it_works').modal({keyboard: false});
});

$('#dreamcatcher1').click(function(){
  var draggableId = orbs[Math.floor(Math.random()*items.length)][0];
      //send orb id and get dream contents via ajax
      $.post("../lib/view_dream.php",{orbID:draggableId},function(data,status){
        dream_data = JSON.parse(data, ",");
        orbID = dream_data[0];
        Story = dream_data[1];
        Emotion = dream_data[2];
        Image_Path_1 = dream_data[3];
        Image_Path_2 = dream_data[4];
        display_dream(orbID, Story, Emotion, Image_Path_1, Image_Path_2);
      });

      function display_dream(orbID, Story, Emotion, Image_Path_1, Image_Path_2) {
        var page_element = "";
        var title = "";
        title = "<p> Orb Number: #" + orbID + "</p>";
        page_element += "<div>";
        page_element += "<p>" + Story + "</p>";
        page_element += "<p>" + Emotion + "</p>";
        page_element += "<p>" + "<img class=\"col-xs-6 col-xs-offset-3\" src=" + Image_Path_1 + ">" + "</p>";
        page_element += "<p>" + "<img class=\"col-xs-6 col-xs-offset-3\" src=" + Image_Path_2 + ">" + "</p>";
        page_element += "</div>";

        var title = $.parseHTML(title);
        var html = $.parseHTML(page_element);
        $('#dreamtime .modal-header').empty();
        $('#dreamtime .modal-body').empty();

        $('#dreamtime .modal-header').append(title);
        $('#dreamtime .modal-body').append(html);

      }
  $('#dreamtime').modal({keyboard: false});
});

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};


var rotation = 0;
var pos_gear1 =$('#gear1').css("top");
var pos_gear2_top =$('#gear2').css("top");
var pos_gear2_left =$('#gear2').css("left");
var pos_gear3 =$('#gear3').css("top");


$('.gears').mouseenter(function(){
  $(".geartext").animate({color:"white"},200);
  rotation+=360;
  //
  // $('#gear1').animate({ top:"-=10px"},200);
  // $('#gear2').animate({ top:"+=50px",left:"-=10px"},200);
  // $('#gear3').animate({ top:"+=10px"},200);


  $('#gear1').stop().animate(
    {rotation: rotation},
    {
      duration: 2000,
      step: function(now, fx) {
        $(this).css({"transform": "rotate("+now+"deg)"});
      }
    }
  );
  $('#gear2').stop().animate(
    {rotation: -rotation},
    {
      duration: 2000,
      step: function(now, fx) {
        $(this).css({"transform": "rotate("+now+"deg)"});
      }
    }
  );
  $('#gear3').stop().animate(
    {rotation: rotation},
    {
      duration: 2000,
      step: function(now, fx) {
        $(this).css({"transform": "rotate("+now+"deg)"});
      }
    }
  );

});

$('.gears').mouseleave(function(){
  $(".geartext").animate({color:"gray"},200);
  $('#gear1').stop()
  $('#gear2').stop()
  $('#gear3').stop()
});


$('.about').mouseenter(function(){
  $("#darkorb").animate({"top":"-=40px"},200);
  $(".abouttext").animate({color:"white"},200);

});

$('.about').mouseleave(function(){
  $("#darkorb").animate({"top":"+=40px"},200);
  $(".abouttext").animate({color:"gray"},200);

});

$('.catcher').mouseenter(function(){
  $(".catchertext").animate({color:"white"},200);
});

$('.catcher').mouseleave(function(){
  $(".catchertext").animate({color:"gray"},200);
});



});
