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
			//orb generation needs to go here -- call the orb by orbs[i][0]
			var taken_orbs = [];
			var shelf_spot = String(Math.floor((Math.random() * 120) + 1));
			while ($.inArray(shelf_spot, taken_orbs) != -1) {
				shelf_spot = String(Math.floor((Math.random() * 120) + 1));
				console.log(shelf_spot);
			}
			document.getElementByClassName(shelf_spot).attr("id", orbs[i][0]);
			taken_orbs.push(shelf_spot);
			$("#none").hide();
	}

}
