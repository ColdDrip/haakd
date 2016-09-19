jQuery(document).ready(function($){
	var dream_data = [];

//getting the dream data from the php file
    $.ajax({
        type: "GET",
        url: "../lib/view_dream.php",
        success: function(data) {
						dream_data = JSON.parse(data, ",");
						orbID = dream_data[0];
						Story = dream_data[1];
						Emotion = dream_data[2];
						Image_Path_1 = dream_data[3];
						Image_Path_2 = dream_data[4];
            display_dream(orbID, Story, Emotion, Image_Path_1, Image_Path_2);
        },
        error: function (err){
            console.log("error:"+err);
        }
    });
});

//outputting the dream data for the html page
//edit here to change the css for view_dream.html
function display_dream(orbID, Story, Emotion, Image_Path_1, Image_Path_2) {
	var page_element = "";
	page_element += "<div>";
	page_element += "<p>" + orbID + "</p>";
	page_element += "<p>" + Story + "</p>";
	page_element += "<p>" + Emotion + "</p>";
	page_element += "<p>" + "<img src=" + Image_Path_1 + ">" + "</p>";
	page_element += "<p>" + "<img src=" + Image_Path_2 + ">" + "</p>";
	page_element += "</div>";

	var html = $.parseHTML(page_element);
	//console.log(html);
	$('#dream').append(html);

}
