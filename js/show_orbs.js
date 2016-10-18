jQuery(document).ready(function($){
	var orbs = [];
	var maximum_id;
	var number;



//getting my recent dreams
var my_dreams_data;
var my_shelf_spot = ['my1','my2','my3','my4','my5','my6']

$.get("../lib/get_my_dreams.php",function(data){
		my_dreams_data = JSON.parse(data,",");
		for (i in my_dreams_data){
			$("."+ my_shelf_spot[i]).attr("id",my_dreams_data[i][0]);

			$("."+ my_shelf_spot[i]).css("opacity","1");
			$("."+ my_shelf_spot[i]).css("cursor","pointer");
			$("."+ my_shelf_spot[i]).attr("onclick","");


			console.log(my_dreams_data);
}
});
colors(my_dreams_data,"myorbs");
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

		}
		//console.log("orbs map",orbs_map);

		console.log(taken_orbs);

		//console.log("taken orbs", taken_orbs);
		for (var j in taken_orbs){
			$("."+taken_orbs[j][0]).css("opacity","1");
			$("."+taken_orbs[j][0]).css("cursor","pointer");
			$("."+taken_orbs[j][0]).attr("onclick","");
		}
				special();
				colors(taken_orbs,"normal");
				special();

function special() {
	console.log("running");
				for (var b in taken_orbs) {
					if (taken_orbs[b][3] == maximum_id) {
						console.log("the array id", taken_orbs[b][3]);
						console.log("the max", maximum_id);
						//make the css change you want here
						$(".button." + taken_orbs[b][0]).css("border", "1px dashed #000000");
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
colors(taken_orbs,"normal");
special();

});


				}
				function colors(orb_data,type) {

					var emo_color =
					{
						"Joy":["0px 0px 30px #fffdb7","radial-gradient(ellipse at center, #FFFAE0 0%, #FFF9D9 40%,#FFF3AC 65%, #FFEF8D 100%)"],
						"Surprise":["0px 0px 30px #66F1FB","radial-gradient(ellipse at center, #E3FCFE 0%, #B9F8FD 40%,#8FF4FC 65%, #66F1FB 100%)"],
						"Anger":["0px 0px 30px #ffc4c4","radial-gradient(ellipse at center, #FFF0F1 0%, #FFDBDE 40%,#FFB1B7 65%, #FF959C 100%)"],
						"Fear":["0px 0px 30px #ddb4ff","radial-gradient(ellipse at center, #F5F2FF 0%, #E6DCFF 40%,#CDBAFF 65%, #C3ABFF 100%)"],
						"Sadness":["0px 0px 30px #b7d1ff","radial-gradient(ellipse at center, #EDF7FF 0%, #D4ECFF 40%,#A1D6FF 65%, #7EC7FF 100%)"],
						"Disgust":["0px 0px 30px #b4ffd8","radial-gradient(ellipse at center, #DFFBE2 0%, #D2FAD6 40%,#B9F8C0 65%, #A0F6A9 100%)"],
						"Not Sure":["0px 0px 30px #ffffff","radial-gradient(ellipse at center, #ffffff 0%, #ffffff 40%,#ffffff 65%, #9f9f9f 100%)"],
						"Dreamtime":["0px 0px 30px #000000","radial-gradient(ellipse at center, #ffffff 0%, #ffffff 40%,#000000 65%, #000000 100%)"]
					}
					if (type="normal"){
					for (h in orb_data) {
						console.log(orb_data);
						$(".button." + orb_data[h][0]).css("box-shadow", emo_color[orb_data[h][1]][0]);
						$(".button." + orb_data[h][0]).css("background",emo_color[orb_data[h][1]][1]);
					}
				} else if(type="myorbs"){
					for (h in orb_data) {
						console.log(orb_data);
						$(".button." + my_shelf_spot[h]).css("box-shadow", emo_color[orb_data[h][1]][0]);
						$(".button." + my_shelf_spot[h]).css("background",emo_color[orb_data[h][1]][1]);
					}
				}
				}
		});
