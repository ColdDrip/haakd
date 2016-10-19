$(document).ready(function(){
  $(".inside-cont").fadeIn(3000);
  console.log("js.js ready");

var dragging = false;
  //initialise draggable orb
  $(".button").draggable({revert:"invalid"});
  $(".button").draggable({snap:".chute"});
  $(".button").draggable("option","snapMode","inner");
  $(".button").data({
    'originalLeft': $(".button").css('left'),
    'originalTop': $(".button").css('top')
  });

  /**------------------------------------------------------------------------**/
  //initialise droppable area for orbs -- "pensieve"
  $(".chute").droppable({drop:function(event,ui){
    var draggableId = $(ui.draggable).attr("id");
    console.log(draggableId);
    $(this).addClass("debug");
    $('#myModal').modal({keyboard: false});

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
      $('#myModal .modal-header').append(title);
      $('#myModal .modal-body').append(html);

    }
  }
});
/**------------------------------------------------------------------------**/
//On modal close
$('#myModal').on('hidden.bs.modal', function () {
  //revert orb to original position
  $(".button").animate({
    'left': $(".button").data('originalLeft'),
    'top': $(".button").data('originalTop')
  });

  $('.chute').removeClass('debug');
  //reset view dream modal content
  $('#myModal .modal-header').empty();
  $('#myModal .modal-body').empty();
});
/**-------------------------------------------------------------------------**/
//Levitation hover
$('.button').mousedown(function(){
  dragging=true;
  //console.log(dragging);
});

$('.button').mouseup(function(){
  dragging=false;
  //console.log(dragging);
});

$('.button').mouseenter(function(){
  if (dragging==false){
    //console.log('mouse enter');
  $(this).animate({"top":"-=10px"},200,function(){});
  $('.dragtext').animate({"opacity":"1"},200,function(){});
}
});

$('.button').mouseleave(function(){
  if (dragging==false){
  //console.log('mouse leave');
  $(this).animate({"top":"+=10px"},200,function(){});
  $('.dragtext').animate({"opacity":"0"},200,function(){});
}
});

/*------------------------------------------------------*/
//instruction hover
$('.add_button').mouseenter(function(){
  $('.clicktoadd').animate({"opacity":"1"},200,function(){});
});

$('.add_button').mouseleave(function(){
  $('.clicktoadd').animate({"opacity":"0"},200,function(){});
});
$('.control').mouseenter(function(){
  $('.impact').animate({"opacity":"1"},200,function(){});
});
$('.control').mouseleave(function(){
  $('.impact').animate({"opacity":"0"},200,function(){});
});
$('#searchTerm').mouseenter(function(){
  $('.search-inst').animate({"opacity":"1"},200,function(){});
});
$('#searchTerm').mouseleave(function(){
  $('.search-inst').animate({"opacity":"0"},200,function(){});
});
$('#changeImages1').mouseenter(function(){
  $('.refresh-img1').animate({"opacity":"1"},200,function(){});
});
$('#changeImages1').mouseleave(function(){
  $('.refresh-img1').animate({"opacity":"0"},200,function(){});
});
$('#changeImages2').mouseenter(function(){
  $('.refresh-img2').animate({"opacity":"1"},200,function(){});
});
$('#changeImages2').mouseleave(function(){
  $('.refresh-img2').animate({"opacity":"0"},200,function(){});
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
/**-------------------------------------------------------------------------**/
});
