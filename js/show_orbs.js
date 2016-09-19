jQuery(document).ready(function($){
	var orbs = [];

//getting the dream data from the php file
    $.ajax({
        type: "GET",
        url: "../lib/get_orbs.php",
        success: function(data) {
						orbs = JSON.parse(data, ",");
            console.log(orbs);
						populate(orbs);
        },
        error: function (err){
            console.log("error:"+err);
        }
    });
});

//populating index with the orbs
function populate(orbs) {
	for (i=0; i<orbs.length; i++)  {

		var page_element = "";

		page_element += "<div>";
		//html for orb generation needs to go here -- call the orb by orbs[i][0]
		page_element += "</div>";

		var orb_display = $.parseHTML(page_element);
		$('#orb_display').append(orb_display);
	}


}
