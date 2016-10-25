$(document).ready(function(){
  $(".inside-cont").fadeIn(3000);
  console.log("js.js ready");

var dragging = false;
  //initialise draggable orb
  $(".button").draggable({revert:"invalid",scroll:false});
  // $(".button").draggable({snap:".chute"});
  // $(".button").draggable("option","snapMode","inner");
  $(".button").data({
    'originalLeft': $(".button").css('left'),
    'originalTop': $(".button").css('top')
  });

  /**------------------------------------------------------------------------**/
  //initialise droppable area for orbs -- "pensieve"

  var draggablespot;
  $(".chute").droppable({drop:function(event,ui){
    var draggableId = $(ui.draggable).attr("id");
     draggablespot =$(ui.draggable).attr("class").split(' ')[1];
    console.log(draggableId,draggablespot, $(".button."+draggablespot).css("background"));

    $(".button."+draggablespot).position({
      my: "center",
      at: "center",
      of: ".chute"
    });

    $('.dragtext').animate({"opacity":"0"},200);




    //send orb id and get dream contents via ajax
    $.post("../lib/view_dream.php",{orbID:draggableId},function(data,status){
      dream_data = JSON.parse(data, ",");
      orbID = dream_data[0];
      Story = dream_data[1];
      Emotion = dream_data[2];
      Image_Path_1 = dream_data[3];
      Image_Path_2 = dream_data[4];
      contributor1 = dream_data[5];
      contributor1 = dream_data[6];
      contributor2 = dream_data[7];
      issued1 = dream_data[8];
      issued2 = dream_data[9];
      title1 = dream_data[10];
      title2 = dream_data[11];
      troveUrl1 = dream_data[12];
      troveUrl2 = dream_data[13];
      display_dream(orbID, Story, Emotion, Image_Path_1, Image_Path_2,contributor1,contributor2,issued1,issued2,title1,title2,troveUrl1,troveUrl2);
    });
    function display_dream(orbID, Story, Emotion, Image_Path_1, Image_Path_2, Contributor1, Contributor2, Issued1, Issued2, Title1, Title2,TroveUrl1, TroveUrl2) {
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
        var info1="";
        var info2="";
        var link1="";
        var link2="";

        $(".large_orb").css("background",emo_color[Emotion][1]);
        $(".large_orb").css("box-shadow",emo_color[Emotion][0]);

      title = "<p> Orb Number: #" + orbID + "</p>";
      page_element = "<p>" + Story + "</p>";
      dreamemo = "<p> Emotion: </p><p>" + Emotion + "</p>";
      pic1 = "<img class=\"col-xs-12\" src=" + Image_Path_1 + ">" ;
      pic2 = "<img class=\"col-xs-12\" src=" + Image_Path_2 + ">";
      info1="<h2>"+Title1+"</h2><p>Contributor: "+Contributor1+" Year: "+Issued1+"</p>"
      info2="<h2>"+Title2+"</h2><p>Contributor: "+Contributor2+" Year: "+Issued2+"</p>"


       title = $.parseHTML(title);
       page_element = $.parseHTML(page_element);
       pic1 =$.parseHTML(pic1);
       pic2 =$.parseHTML(pic2);
       dreamemo=$.parseHTML(dreamemo);
       info1=$.parseHTML(info1);
       info2=$.parseHTML(info2);


      $('#viewdreamemotion').empty();
      $('#viewdreamcontent').empty();
      $('#pic1').empty();
      $('#pic2').empty();
      $('#pic1-overlay>p').empty();
      $('#pic2-overlay>p').empty();

      $('#viewdreamemotion').append(dreamemo);
      $('#viewdreamcontent').append(page_element);
      $('#pic1').append(pic1);
      $('#pic2').append(pic2);
      $('#pic1-overlay>p').append(info1);
      $('#pic2-overlay>p').append(info2);
      $('#pic1-overlay p a').attr("href",link1);
      $('#pic2-overlay p a').attr("href",link2);

      $('#viewdreamorb').fadeIn(1000);

    }
  }
});

/*------------------------------------------------------*/
//redirect buttons
$('.add_button').click(function(event){
  event.preventDefault();
  $("#bgmusic").animate({volume: 0}, 1000);
  $('#loading_screen').fadeIn(1000,function(){window.location ="add_dream_story.html"});
});

$('#dreamer').click(function(event){
  event.preventDefault();
  $("#bgmusic").animate({volume: 0}, 1000);
  $('#loading_screen').fadeIn(1000,function(){window.location ="index.html"});
});


/*------------------------------------------------------*/
//instruction hover

$('.add_button').mouseenter(function(){
  $('.clicktoadd').animate({"opacity":"1"},200,function(){});
});

$('.add_button').mouseleave(function(){
  $('.clicktoadd').animate({"opacity":"0"},200,function(){});
});

//background music control
var ismuted=false;
$('#musiccontrol').click(function(event){
  event.preventDefault();
  if (ismuted==false){
    $("#bgmusic").animate({volume: 0}, 1000);
    ismuted=true;
    $(this).empty().append('<span class=\"glyphicon glyphicon-volume-off\" aria-hidden=\"true\"></span>')
  } else if (ismuted==true){
    $("#bgmusic").animate({volume: 1}, 1000);
    ismuted=false;
    $(this).empty().append('<span class=\"glyphicon glyphicon-volume-up\" aria-hidden=\"true\"></span>')

  }
});

/*------------------------------------------------------*/
//scroll left osition
$( ".inside-cont").scrollLeft( 400 );
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
