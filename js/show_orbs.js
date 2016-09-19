jQuery(document).ready(function($){
	var orbs = [];

//getting the dream data from the php file
    $.ajax({
        type: "GET",
        url: "../lib/get_orbs1.php",
        success: function(data) {
						orbs = JSON.parse(data, ",");
            console.log(orbs);

        },
        error: function (err){
            console.log("error:"+err);
        }
    });
});
