jQuery(document).ready(function($){
	var story_data = [];

//getting the story data from the php file
    $.ajax({
        type: "GET",
        url: "../lib/get_dream_story.php",
        success: function(data) {
						story_data = JSON.parse(data, ",");
						orbID = story_data[0];
						Story = story_data[1];
						Emotion = story_data[2];
            display_dream(orbID, Story, Emotion);
        },
        error: function (err){
            console.log("error:"+err);
        }
    });
});

//outputting the dream data for the html page
//edit here to change the css for view_dream.html
function display_dream(orbID, Story, Emotion) {
	var page_element = "";
	page_element += "<div>";
	page_element += "<p>" + orbID + "</p>";
	page_element += "<p>" + Story + "</p>";
	page_element += "<p>" + Emotion + "</p>";
	page_element += "</div>";

	var html2 = $.parseHTML(page_element);
	//console.log(html);
	$('#dream_story').append(html2);

}
