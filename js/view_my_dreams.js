jQuery(document).ready(function($){
	var dream_data = [];

//getting the dream data from the php file
    $.ajax({
        type: "GET",
        url: "../lib/get_my_dreams.php",
        success: function(data) {
						dream_data1 = JSON.parse(data, ",");
            console.log(dream_data1);
						//orbID = dream_data1[0];
						//Story = dream_data1[1];
						//Emotion = dream_data1[2];
						//Image_Path_1 = dream_data1[3];
						//Image_Path_2 = dream_data1[4];
            display_dream(dream_data1);
        },
        error: function (err){
            console.log("error:"+err);
        }
    });
});

//outputting the dream data for the html page
//edit here to change the css for view_dream.html
function display_dream(dream_data1) {
	var page_element = "";
  for (var i in dream_data1) {
	page_element += "<div>";
	page_element += "<p>" + dream_data1[i][0] + "</p>";
	page_element += "<p>" + dream_data1[i][1] + "</p>";
	page_element += "<p>" + dream_data1[i][2] + "</p>";
	page_element += "<p>" + "<img src=" + dream_data1[i][3] + ">" + "</p>";
	page_element += "<p>" + "<img src=" + dream_data1[i][4] + ">" + "</p>";
	page_element += "</div>";
}

	var html = $.parseHTML(page_element);
	//console.log(html);
	$('#my_dreams').append(html);

}
