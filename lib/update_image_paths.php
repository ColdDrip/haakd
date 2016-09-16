<!doctype html>
<html>
	<head>
		<title>dreamer API</title>

		<script src="https://code.jquery.com/jquery-1.12.3.js"></script>
		<meta charset="utf-8">

	</head>
	<body>
	<div class="site-main" id="main">

	  <div class="entry-content wide">



		<form action="#" id="searchTrove">
			<input id="searchTerm" type="text" />



			<button type="submit" id="searchbtn">Search</button>
		</form>

		<div id="output">
		</div>

		</div>
			</div>
		<footer></footer>


<script type="text/JavaScript">
    var loadedImages = [];
    //var urlPatterns = ["flickr.com", "nla.gov.au", "artsearch.nga.gov.au", "recordsearch.naa.gov.au", "images.slsa.sa.gov.au"];
    var found = 0;
(function($){

	function waitForFlickr() {
		if(found == loadedImages.length) {
			printImages();
		} else {
			setTimeout(waitForFlickr, 250);
		}

	}

    $("form#searchTrove").submit(function(event) {
        event.preventDefault();

        loadedImages = [];
	found = 0;
        //get input values
        var searchTerm = $("#searchTerm").val().trim();
        searchTerm = searchTerm.replace(/ /g, "%20");
        var apiKey = "jsk1qqntnrj7qbvf";

        //create searh query
        var url = "http://api.trove.nla.gov.au/result?key=" + apiKey + "&l-availability=y%2Ff&encoding=json&zone=picture" + "&sortby=relevance&n=100&q=" + searchTerm + "&callback=?";

        //get the JSON information we need to display the images
        $.getJSON(url, function(data) {
            $('#output').empty();
            console.log(data);
			var datalength = data.response.zone[0].records.work.length;
			console.log(datalength);
			console.log(data.response.zone[0].records.work[1].identifier[1].value);



            var imageNum = Math.floor((Math.random()*datalength));
			console.log(imageNum);
			var imageNum2= Math.floor((Math.random()*datalength));

			//if (imageNum =! imageNum2){
			loadedImages.push(data.response.zone[0].records.work[imageNum].identifier[1].value);
			loadedImages.push(data.response.zone[0].records.work[imageNum2].identifier[1].value);


	        console.log(loadedImages);
            printImages();


            //}else {

			//}；
	    // Waits for the flickr images to load
        });
    });




    /*
     *   Depending where the image comes from, there is a special way to get that image from the website.
     *   This function works out where the image is from, and gets the image URL
     */




    function printImages() {

        $("#output").append("<h3>Image Search Results</h3>");

	// Print out all images
        for (var i=0;i<loadedImages.length;i++) {
            var image = new Image();
            image.src = loadedImages[i];
            image.style.display = "inline-block";
            image.style.width = "48%";
            image.style.margin = "1%";
            image.style.verticalAlign = "top";

            $("#output").append(image);
        }

    }



    }(jQuery));
</script>
	</body>
</html>

<?php

$conn = mysqli_connect("localhost", "root", "51648e01a6b8b836", "Dreamer");

// Check connection
if($conn === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}

// Escape user inputs for security
$orbID = mysqli_real_escape_string($conn, $_POST['orbID']);
//$Image_Path_1 = mysqli_real_escape_string($conn, $_POST['Image_Path_1']);
//$Image_Path_2 = mysqli_real_escape_string($conn, $_POST['Image_Path_2']);

//update the database
//$sql = "UPDATE Orb SET Image_Path_1 = '".$Image_Path_1."' WHERE orbID = '".$orbID."'";
//$sql = "UPDATE Orb SET Image_Path_2 = '".$Image_Path_2."' WHERE orbID = '".$orbID."'";

//$sql = "UPDATE Orb SET Image_Path_1 = LoadedImages[0] WHERE orbID = '".$orbID."'";
//$sql = "UPDATE Orb SET Image_Path_2 = LoadedImages[1] WHERE orbID = '".$orbID."'";

$sql = "UPDATE Orb SET Image_Path_1 = LoadedImages[0] WHERE orbID = '"1"'";
$sql = "UPDATE Orb SET Image_Path_2 = LoadedImages[1] WHERE orbID = '"1"'";


if(mysqli_query($conn, $sql)){
    echo "Records added successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}

// close connection
mysqli_close($conn);


?>
