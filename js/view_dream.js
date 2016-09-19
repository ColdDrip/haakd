jQuery(document).ready(function($){
	var dream_data = [];

    $.ajax({
        type: "GET",
        url: "../lib/view_dream.php",
        success: function(data) {
            dream_data = JSON.parse(data);
            display_dream(dream_data);
        },
        error: function (err){
            console.log("error:"+err);
        }
    });
});

function display_dream(dream_data) {
	var page_element = "";
	page_element += "<div>";
	page_element += "<p>" + dream_data.orbID + "</p>";
	page_element += "<p>" + dream_data.Story + "</p>";
	page_element += "<p>" + dream_data.Emotion + "</p>";
	page_element += "<p>" + "<img src=" + dream_data.Image_Path_1 + ">" + "</p>";
	page_element += "<p>" + "<img src=" + dream_data.Image_Path_2 + ">" + "</p>";
	page_element += "</div>";

	var html = $.parseHTML(page_element);
	$('#dream').append(html);

}
