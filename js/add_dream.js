//document.getElementById('picture_stuff').style.display = "none"

$(document).ready(function(){
  $("#user_dream_orb").fadeIn(1000);

  var loadedImages = [];
  var selectImages =[];

  var ImageNum;
  var ImageNum2;


  var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];
  var found = 0;

  //Initialise var for storing dream
  var user_dream_story="";
  var user_dream_emotion="";
  var Image_Path_1;
  var Image_Path_2;
  var finished_orb=false;

  //store story when click next
  $("#newDreamSubmit").click(function(){
    $("#newDreamSubmit").fadeOut(1000);
    $("#back").fadeOut(1000);
    $(".emotion-control").hide(1000,function(){
      $("#image_section") .fadeIn(1000);
    });
    $("#Story").attr("disabled","disabled");
    user_dream_story=$("#Story").val();
    user_dream_emotion=$("#Emotion").val();
    finished_orb=true;//tracks if the user has completed the orb contents
    $("#user_dream_orb").draggable({revert:"invalid",cancel:'',snap:".pensieve_add_dream",zindex:10000});

    //show pensieve
    $(".pensieve_add_dream").fadeIn(2000);
  });

  $("#Emotion").change(
function(){
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
        $("#Story").css("background",emo_color[$("#Emotion option:selected").val()][1]);
        $("#Story").css("box-shadow",emo_color[$("#Emotion option:selected").val()][0]);
        $("#Story").css("color","#0f0f0f");


    }
  );

  //When clicking the search image button
  $("#searchbtn").click(function searchTrove(event) {
    console.log("click");
    event.preventDefault();

    loadedImages = [];
    var url1;
    var url2;

    //get input values
    var searchTerm = $("#searchTerm").val().trim();
    searchTerm = searchTerm.replace(/ /g, "%20");
    var sortBy = $("#sortBy").val();
    var apiKey = "h6qpbr12thbbd2r7";

    //create searh query
    var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&l-format=Art+work&encoding=json&zone=picture" + "&sortby=relevance&n=100&q=" + searchTerm + "&callback=?";

    //get the JSON information we need to display the images
    $.getJSON(url, function(data) {
      $('#output1').empty();
      $('#output2').empty();

      console.log(data);
      console.log(loadedImages.length);

      $.each(data.response.zone[0].records.work, processImages);
       imageNum = Math.floor((Math.random()*loadedImages.length));
       imageNum2 = imageNum + 1;

      console.log(loadedImages.length);
      console.log("first search image1-1",imageNum);
      console.log("first search image2-2",imageNum2);


      var contributor1 = data.response.zone[0].records.work[imageNum].contributor[0];
      console.log(contributor1);

      var contributor2 = data.response.zone[0].records.work[imageNum2].contributor[0];
      console.log(contributor2);

      var issued1 = data.response.zone[0].records.work[imageNum].issued;
      console.log(issued1);

      var issued2 = data.response.zone[0].records.work[imageNum2].issued;
      console.log(issued2);

      var title1 = data.response.zone[0].records.work[imageNum].title;
      console.log(title1);

      var title2 = data.response.zone[0].records.work[imageNum2].title;
      console.log(title2);

      var troveUrl1 = data.response.zone[0].records.work[imageNum].troveUrl;
      console.log(troveUrl1);

      var troveUrl2 = data.response.zone[0].records.work[imageNum2].troveUrl;
      console.log(troveUrl2);



      updateURL(imageNum,imageNum2);
      printImages();
    });
  });

  //when refreshing image1
  $("a#changeImages1").click(function changeImages(event) {
    event.preventDefault();
    $('#output1').empty();

    imageNum = Math.floor((Math.random()*loadedImages.length));
    if (imageNum == imageNum2){
      imageNum = imageNum + 1;
      console.log("change1-image1",imageNum);
      console.log("change1-image2",imageNum2);
      printImages();
    }else{
      console.log("change1-1-image1",imageNum);
      console.log("change1-1-image2",imageNum2);
      updateURL(imageNum,imageNum2);
      printImages();

    }
  });


  //when refreshing image2
  $("a#changeImages2").click(function changeImages2(event) {
    event.preventDefault();
    $('#output2').empty();
    imageNum2 = Math.floor((Math.random()*loadedImages.length));
    if (imageNum == imageNum2){
      imageNum2 = imageNum2+1;
      console.log("change2-image1",imageNum);
      console.log("change2-image2",imageNum2);
      printImages();
    }else{
      console.log("change2-1-image1",imageNum);
      console.log("change2-1-image2",imageNum2);
      updateURL(imageNum,imageNum2);
      printImages();
    }
  });

  //add two images URL into array and print them out
  function updateURL(imageNum,imageNum2){
    url1 = loadedImages[imageNum];
    url2 = loadedImages[imageNum2];
    Image_Path_1 = url1;
    Image_Path_2 = url2;
    console.log(Image_Path_1);
    console.log(Image_Path_2);
  }

  function processImages(index, troveItem) {

    var imgUrl = troveItem.identifier[0].value;
    //console.log(imgUrl);
    //var whatisthis = troveItem.identifier[1].value;
    //console.log(whatisthis);
    //console.log(troveItem);
    if (imgUrl.indexOf(urlPatterns[0]) >= 0) { // flickr
      found++;
      addFlickrItem(imgUrl, troveItem);

    } else if (imgUrl.indexOf(urlPatterns[1]) >= 0) { // nla.gov
      found++;
      loadedImages.push(
        imgUrl + "/representativeImage?wid=900" // change ?wid=900 to scale the image
      );

    } else if (imgUrl.indexOf(urlPatterns[2]) >= 0) { //artsearch
      found++;
      loadedImages.push(
        "http://artsearch.nga.gov.au/IMAGES/LRG/" + getQueryVariable("IRN", imgUrl) + ".jpg"
      );

    } else if (imgUrl.indexOf(urlPatterns[3]) >= 0) { //recordsearch
      found++;
      loadedImages.push(
        "http://recordsearch.naa.gov.au/NAAMedia/ShowImage.asp?T=P&S=1&B=" + getQueryVariable("Number", imgUrl)
      );

    } else if (imgUrl.indexOf(urlPatterns[4]) >= 0) { //slsa
      found++;
      loadedImages.push(
        imgUrl.slice(0, imgUrl.length - 3) + "jpg"
      );


    } else {

    }
  }

  function addFlickrItem(imgUrl, troveItem) {
    var flickr_key = "a4d0bf2f4bde0595521b7bd8317ec428";
    var flickr_secret = "efc7221b694ff55e";
    var flickr_url = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=" + flickr_key + "&photo_id=";
    var url_comps = imgUrl.split("/");
    var photo_id = url_comps[url_comps.length - 1];

    $.getJSON(flickr_url + photo_id + "&format=json&nojsoncallback=1", function(data) {
      if (data.stat == "ok") {
        var flickr_image_url = data.sizes.size[data.sizes.size.length - 1].source;
        loadedImages.push(
          flickr_image_url
        );
      }
    });

  }

  function printImages() {
    // Print out all images
    var image1 = new Image();
    image1.src = url1;
    image1.style.display = "inline-block";
    image1.style.width = "100%";
    image1.style.margin = "1%";
    image1.style.verticalAlign = "middle";
    $("#output1").append(image1);

    var image2 = new Image();
    image2.src = url2;
    image2.style.display = "inline-block";
    image2.style.width = "100%";
    image2.style.margin = "1%";
    image2.style.verticalAlign = "middle";

    $("#output2").append(image2);

  }

  // from http://css-tricks.com/snippets/javascript/get-url-variables/
  function getQueryVariable(variable, url) {
    var query = url.split("?");
    var vars = query[1].split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return (false);
  }

  //drag to add dream
  $(".pensieve_add_dream").droppable({drop:function(event,ui){
    $(this).addClass("debug2");
    console.log("drop");
    $("#Story").animate({"width":"10%","height":"10px"},200,function(){});
    $("#Story").animate({"color":"#000000","background-color":"#ffffff"},200,function(){});

    $(".user_dream_orb").animate({"top":"+=20px"},200,function(){});
    $(".large_triangle").hide(200);
    $("#image_section").fadeOut(1000);

       //send dream contents via ajax post
    $.post("../lib/add_dream_story.php",{
      Story:user_dream_story,Emotion:user_dream_emotion,Image_Path_1:Image_Path_1,Image_Path_2:Image_Path_2});
      window.location.href = "http://deco1800-pg6.uqcloud.net/index.html";

}
});


});
