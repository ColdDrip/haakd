document.getElementById('picture_stuff').style.display = "none"




var loadedImages = [];
var selectImages =[];

var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];
var found = 0;
(function($){

  $("#newDreamSubmit").click(function changeImages(event) {
  document.getElementById('image_section').style.display = "none"

}

  $("form#searchTrove").submit(function searchTrove(event) {
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
      var imageNum = Math.floor((Math.random()*loadedImages.length));
      var imageNum2 = imageNum + 1;

      console.log(loadedImages.length);
      console.log("first search image1-1",imageNum);
      console.log("first search image2-2",imageNum2);


      updateURL(imageNum,imageNum2);
      printImages();

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
    });
  });
  //add two images URL into array and print them out
  function updateURL(imageNum,imageNum2){
    url1 = loadedImages[imageNum];
    url2 = loadedImages[imageNum2];
    var Image_Path_1 = url1;
    var Image_Path_2 = url2;
    console.log(Image_Path_1);
    console.log(Image_Path_2);
    document.getElementById('Image_Path_1').value = Image_Path_1;
    document.getElementById('Image_Path_2').value = Image_Path_2;
  }

  function processImages(index, troveItem) {

    var imgUrl = troveItem.identifier[0].value;
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

    //$("#output").append("<h3>Image Search Results</h3>");

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

}(jQuery));
