jQuery(document).ready(function($){
	var orbs = [];
	var maximum_id;
	var number;

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

		$.ajax({
				type: "GET",
				url: "../lib/get_max_orbid.php",
				success: function(data) {
						number = JSON.parse(data, ",");
						maximum_id = number[0];
						//console.log("the max id", maximum_id);
				},
				error: function (err){
						console.log("error:"+err);
				}
		});

		console.log("trial");

		function populate(orbs) {
		var taken_orbs = [];
		//var orbs_map=[];
		for (var i=0; i<orbs.length; i++)  {
			var shelf_spot = (Math.floor((Math.random() * 120) + 1));
			for (var s in taken_orbs) {
				while (taken_orbs[s][0] == shelf_spot) {
					console.log("equal");
					shelf_spot = (Math.floor((Math.random() * 120) + 1));
				}
			}
			 taken_orbs.push([shelf_spot, orbs[i][1], orbs[i][2], orbs[i][0]]);
			 //console.log(taken_orbs.includes(shelf_spot));
			$("." + shelf_spot).attr("id", orbs[i][0]);
			//console.log(orbs);

			//orbs_map.push([i,orbs[i][0]]);

		}
		//console.log("orbs map",orbs_map);

		console.log(taken_orbs);

		//console.log("taken orbs", taken_orbs);
		for (var j in taken_orbs){
			$("."+taken_orbs[j][0]).css("opacity","1")
			$("."+taken_orbs[j][0]).css("cursor","pointer");
			$("."+taken_orbs[j][0]).attr("onclick","");
		}

		/*	var orbs_to_hide = [];
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

			//console.log("orbs to hide", orbs_to_hide);
			//console.log(orbs_to_hide);


			for (var p in orbs_to_hide) {
			 		$("." + orbs_to_hide[p]).css("opacity", "0");
					$("." + orbs_to_hide[p]).attr("onclick", "return false");
					}
					*/
					special();
function colors() {
					for (var h in taken_orbs) {
						if (taken_orbs[h][1] == "Joy") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #fffdb7");
							$(".button." + taken_orbs[h][0]).css("background","radial-gradient(ellipse at center, #FFFAE0 0%, #FFF9D9 40%,#FFF3AC 65%, #FFEF8D 100%)");
						}
						if (taken_orbs[h][1] == "Surprise") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #66F1FB");
							$(".button." + taken_orbs[h][0]).css("background","radial-gradient(ellipse at center, #E3FCFE 0%, #B9F8FD 40%,#8FF4FC 65%, #66F1FB 100%)");
						}
						if (taken_orbs[h][1] == "Anger") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #ffc4c4");
							$(".button." + taken_orbs[h][0]).css("background","radial-gradient(ellipse at center, #FFF0F1 0%, #FFDBDE 40%,#FFB1B7 65%, #FF959C 100%)");
						}
						if (taken_orbs[h][1] == "Fear") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #ddb4ff");
							$(".button." + taken_orbs[h][0]).css("background","radial-gradient(ellipse at center, #F5F2FF 0%, #E6DCFF 40%,#CDBAFF 65%, #C3ABFF 100%)");
						}
						if (taken_orbs[h][1] == "Sadness") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #b7d1ff");
							$(".button." + taken_orbs[h][0]).css("background","radial-gradient(ellipse at center, #EDF7FF 0%, #D4ECFF 40%,#A1D6FF 65%, #7EC7FF 100%)");
						}
						if (taken_orbs[h][1] == "Disgust") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #b4ffd8");
							$(".button." + taken_orbs[h][0]).css("background","radial-gradient(ellipse at center, #DFFBE2 0%, #D2FAD6 40%,#B9F8C0 65%, #A0F6A9 100%)");
						}
						if (taken_orbs[h][1] == "Not Sure") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #ffffff");
							$(".button." + taken_orbs[h][0]).css("background","radial-gradient(ellipse at center, #ffffff 0%, #ffffff 40%,#ffffff 65%, #9f9f9f 100%)");
						}
						if (taken_orbs[h][1] == "Dreamtime") {
							$(".button." + taken_orbs[h][0]).css("box-shadow", "0px 0px 30px #ffffff");
							//$(".button." + taken_orbs[h][0]).css("background", "linear-gradient(135deg, #fceabb  0%,#fccd4d  59%,#f8b500  66%,#fbdf93  100%)");
							$(".button." + taken_orbs[h][0]).css("background", " linear-gradient(135deg, rgba(226,226,226,1) 0%, rgba(200,200,219,1) 50%, rgba(190,190,190,1) 51%, rgba(254,254,254,1) 100%)");


						}
					}
				}


				colors();
				special();

function special() {
	console.log("running");
				for (var b in taken_orbs) {
					if (taken_orbs[b][3] == maximum_id) {
						console.log("the array id", taken_orbs[b][3]);
						console.log("the max", maximum_id);
						//make the css change you want here
						$("." + taken_orbs[b][0]).css("border", "1px dashed #ffffff");
						$(".button." + taken_orbs[b][0]).css("content", "new");
						$(".button." + taken_orbs[b][0]).css("color", "black");




					}
				}
			}

$(".button").hover(function(){
	var position = $(this).attr("class").split(' ')[1];
	for (var x in taken_orbs) {
		if (taken_orbs[x][0] == position) {
			$(this).css("background-image", "url("+taken_orbs[x][2]+")");
			$(this).css("background-size", "30px");

		}
	}
special();},
function() {
$(this).css("background-image", "");
colors();
special();

});


				}
		});
