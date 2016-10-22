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
  var draggableId = orbs[Math.floor(Math.random()*orbs.length)][0];
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
        var dreamemo="";
        var pic1 ="";
        var pic2 ="";
        var emo_color =
        {
            "Joy":["0px 0px 30px #fffdb7","radial-gradient(ellipse at center, #FFFAE0 0%, #FFF9D9 40%,#FFF3AC 65%, #FFEF8D 100%)"],
            "Surprise":["0px 0px 30px #66F1FB","radial-gradient(ellipse at center, #E3FCFE 0%, #B9F8FD 40%,#8FF4FC 65%, #66F1FB 100%)"],
            "Anger":["0px 0px 30px #ffc4c4","radial-gradient(ellipse at center, #FFF0F1 0%, #FFDBDE 40%,#FFB1B7 65%, #FF959C 100%)"],
            "Fear":["0px 0px 30px #ddb4ff","radial-gradient(ellipse at center, #F5F2FF 0%, #E6DCFF 40%,#CDBAFF 65%, #C3ABFF 100%)"],
            "Sadness":["0px 0px 30px #b7d1ff","radial-gradient(ellipse at center, #EDF7FF 0%, #D4ECFF 40%,#A1D6FF 65%, #7EC7FF 100%)"],
            "Disgust":["0px 0px 30px #b4ffd8","radial-gradient(ellipse at center, #DFFBE2 0%, #D2FAD6 40%,#B9F8C0 65%, #A0F6A9 100%)"],
            "Not Sure":["0px 0px 30px #ffffff","radial-gradient(ellipse at center, #ffffff 0%, #ffffff 40%,#ffffff 65%, #9f9f9f 100%)"]
          }

          $(".large_orb").css("background",emo_color[Emotion][1]);
          $(".large_orb").css("box-shadow",emo_color[Emotion][0]);

        title = "<p> Orb Number: #" + orbID + "</p>";
        page_element = "<p>" + Story + "</p>";
        dreamemo = "<p> Emotion: </p><p>" + Emotion + "</p>";
        pic1 = "<img class=\"col-xs-12\" src=" + Image_Path_1 + ">" ;
        pic2 = "<img class=\"col-xs-12\" src=" + Image_Path_2 + ">";

         title = $.parseHTML(title);
         page_element = $.parseHTML(page_element);
         pic1 =$.parseHTML(pic1);
         pic2 =$.parseHTML(pic2);
         dreamemo=$.parseHTML(dreamemo);

        $('#viewdreamemotion').empty();
        $('#viewdreamcontent').empty();
        $('#pic1').empty();
        $('#pic2').empty();

        $('#viewdreamemotion').append(dreamemo);
        $('#viewdreamcontent').append(page_element);
        $('#pic1').append(pic1);
        $('#pic2').append(pic2);
      }
  $('#viewdreamorb').fadeIn(1000);
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

$('.geartext').mouseenter(function(){
  $(".geartext").animate({color:"white"},200);
  rotation+=360;

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

$('.geartext').mouseleave(function(){
  $(".geartext").animate({color:"gray"},200);
  $('#gear1').stop()
  $('#gear2').stop()
  $('#gear3').stop()
});


$('.about').mouseenter(function(){
  $("#darkorb").animate({top:"-=40px"},200);
  $(".abouttext").animate({color:"white"},200);

});

$('.about').mouseleave(function(){
  $("#darkorb").animate({top:"+=40px"},200);
  $(".abouttext").animate({color:"gray"},200);

});

$('.abouttext').mouseenter(function(){
  $("#darkorb").animate({top:"-=40px"},200);
  $(".abouttext").animate({color:"white"},200);

});

$('.abouttext').mouseleave(function(){
  $("#darkorb").animate({top:"+=40px"},200);
  $(".abouttext").animate({color:"gray"},200);

});

$('.catcher').mouseenter(function(){
  $(".catchertext").animate({color:"white"},200);
  $('.catcher').animate({top:"-=30px"})
});

$('.catcher').mouseleave(function(){
  $(".catchertext").animate({color:"gray"},200);
    $('.catcher').animate({top:"+=30px"})
});

$('.catchertext').mouseenter(function(){
  $(".catchertext").animate({color:"white"},200);
  $('.catcher').animate({top:"-=30px"})
});

$('.catchertext').mouseleave(function(){
  $(".catchertext").animate({color:"gray"},200);
    $('.catcher').animate({top:"+=30px"})
});

//redirect Buttons
$('.sign').click(function(event){
  event.preventDefault();
  $('#loading_screen').fadeIn(1000,function(){window.location ="orbs.html"});
});

//on modal close
$("#viewdreamorb").click(function () {
		$("#viewdreamorb").fadeOut(500);
	});

/**-------------------------------------------------------------------------**/
//particles js setting
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value":40, "density": {
        "enable": true, "value_area": 946.9771699587272
      }
    }
    , "color": {
      "value": "#ffffff"
    }
    , "shape": {
      "type":"circle", "stroke": {
        "width": 0, "color": "#000000"
      }
      , "polygon": {
        "nb_sides": 5
      }
      , "image": {
        "src": "img/github.svg", "width": 100, "height": 100
      }
    }
    , "opacity": {
      "value":0.4, "random":true, "anim": {
        "enable": true, "speed": 0.4, "opacity_min": 0, "sync": false
      }
    }
    , "size": {
      "value":20, "random":true, "anim": {
        "enable": false, "speed": 4, "size_min": 10, "sync": false
      }
    }
    , "line_linked": {
      "enable": false, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1
    }
    , "move": {
      "enable":true, "speed":1, "direction":"bottom", "random":true, "straight":false, "out_mode":"out", "bounce":false, "attract": {
        "enable": false, "rotateX": 600, "rotateY": 600
      }
    }
  }
  , "interactivity": {
    "detect_on":"canvas", "events": {
      "onhover": {
        "enable": false, "mode": "bubble"
      }
      , "onclick": {
        "enable": false, "mode": "repulse"
      }
      , "resize":true
    }
    , "modes": {
      "grab": {
        "distance":400, "line_linked": {
          "opacity": 1
        }
      }
      , "bubble": {
        "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3
      }
      , "repulse": {
        "distance": 400, "duration": 0.4
      }
      , "push": {
        "particles_nb": 4
      }
      , "remove": {
        "particles_nb": 2
      }
    }
  }
  , "retina_detect":true
}

);

particlesJS("particles-js2", {
    "particles": {
        "number": {
            "value":300, "density": {
                "enable": true, "value_area": 800
            }
        }
        , "color": {
            "value": "#fff"
        }
        , "shape": {
            "type":"circle", "stroke": {
                "width": 0, "color": "#000000"
            }
            , "polygon": {
                "nb_sides": 5
            }
            , "image": {
                "src": "img/github.svg", "width": 100, "height": 100
            }
        }
        , "opacity": {
            "value":0.3, "random":true, "anim": {
                "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false
            }
        }
        , "size": {
            "value":3.5, "random":true, "anim": {
                "enable": false, "speed": 2.4362316369040355, "size_min": 0.1, "sync": false
            }
        }
        , "line_linked": {
            "enable": false, "distance": 500, "color": "#ffffff", "opacity": 0.4, "width": 2
        }
        , "move": {
            "enable":true, "speed":1, "direction":"bottom", "random":false, "straight":false, "out_mode":"out", "bounce":false, "attract": {
                "enable": false, "rotateX": 600, "rotateY": 1200
            }
        }
    }
    , "interactivity": {
        "detect_on":"window", "events": {
            "onhover": {
                "enable": true, "mode": "bubble"
            }
            , "onclick": {
                "enable": true, "mode": "repulse"
            }
            , "resize":true
        }
        , "modes": {
            "grab": {
                "distance":400, "line_linked": {
                    "opacity": 0.5
                }
            }
            , "bubble": {
                "distance": 121.81158184520176, "size": 2, "duration": 0.3, "opacity": 0.7795941238092913, "speed": 3
            }
            , "repulse": {
                "distance": 200, "duration": 0.4
            }
            , "push": {
                "particles_nb": 4
            }
            , "remove": {
                "particles_nb": 2
            }
        }
    }
    , "retina_detect":true
}

);
});
