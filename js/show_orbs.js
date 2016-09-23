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



		console.log("trial");

		function populate(orbs) {
		var taken_orbs = [];
		for (var i=0; i<orbs.length; i++)  {
			var shelf_spot = (Math.floor((Math.random() * 120) + 1));
			while (taken_orbs.includes(shelf_spot) === true) {
			 shelf_spot = (Math.floor((Math.random() * 120) + 1));
			 }
			 taken_orbs.push([shelf_spot, orbs[i][1], orbs[i][2]]);
			$("#" + shelf_spot).attr("id", orbs[i][0]);


		}

		console.log("taken orbs", taken_orbs);

			var orbs_to_hide = [];
			 	for (var j=1; j<121; j++) {
			 		orbs_to_hide.push(j);
				}

			for (var m in orbs_to_hide) {
				for (var k in taken_orbs) {
					if ((taken_orbs[k][0]) == (orbs_to_hide[m])) {
					 	delete orbs_to_hide[m];
					}
				}
			}

			console.log("orbs to hide", orbs_to_hide);

			console.log(orbs_to_hide);


			for (var p in orbs_to_hide) {
			 		$("." + orbs_to_hide[p]).css("opacity", "0");
					$("." + orbs_to_hide[p]).attr("onclick", "return false");
					}

function colors() {
					for (var h in taken_orbs) {
						if (taken_orbs[h][1] == "Joy") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #fffdb7");
							$(".button." + taken_orbs[h][0]).css("background", "#fffdb7");
						}
						if (taken_orbs[h][1] == "Surprise") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #ffceff");
							$(".button." + taken_orbs[h][0]).css("background", "#ffceff");
						}
						if (taken_orbs[h][1] == "Anger") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #ffc4c4");
							$(".button." + taken_orbs[h][0]).css("background", "#ffc4c4");
						}
						if (taken_orbs[h][1] == "Fear") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #ddb4ff");
							$(".button." + taken_orbs[h][0]).css("background", "#ddb4ff");
						}
						if (taken_orbs[h][1] == "Sadness") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #b7d1ff");
							$(".button." + taken_orbs[h][0]).css("background", "#b7d1ff");
						}
						if (taken_orbs[h][1] == "Disgust") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #b4ffd8");
							$(".button." + taken_orbs[h][0]).css("background", "#b4ffd8");
						}
						if (taken_orbs[h][1] == "Not Sure") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #ffffff");
							$(".button." + taken_orbs[h][0]).css("background", "#ffffff");
						}
					}
				}

				colors();

//trying to make hover work, but it isn't working yet
for (var y in taken_orbs) {
	$(".button." + taken_orbs[y][0]).hover(function() {
		$(this).css("background-image", "url("+taken_orbs[y][2]+")");
	},
	function() {
		$(this).css("background-image", "");
		colors();
	}
	);
}


				}
		});
