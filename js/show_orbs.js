$(document).ready(function(){
	var orbs = [];
	var maximum_id;
	var number;

	var taken_orbs =[];


	//getting my recent dreams
	var my_dreams_data;
	var my_dreams_dic={};
	var my_shelf_spot = ['200','201','202','203','204','205']



	$.get("../lib/get_my_dreams.php",function(data){
	    console.log("data",data);
		my_dreams_data = JSON.parse(data,",");
		console.log("mydream1111",my_dreams_dic);
		for (i in my_dreams_data){
			my_dreams_dic[my_shelf_spot[i]] = [my_shelf_spot[i],my_dreams_data[i][1],my_dreams_data[i][3],my_dreams_data[i][0]]
			$("."+ my_shelf_spot[i]).attr("id",my_dreams_data[i][0]);
			$("."+ my_shelf_spot[i]).css("opacity","1");
			$("."+ my_shelf_spot[i]).css("cursor","pointer");
			$("."+ my_shelf_spot[i]).attr("onclick","");


		}
		colors(my_dreams_dic,"myorbs");
		console.log("mydream",my_dreams_dic);
	});

	//colors(my_dreams_data,"myorbs");

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

	function populate(orbs) {
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

		console.log("takenorb",taken_orbs);

		//console.log("taken orbs", taken_orbs);
		for (var j in taken_orbs){
			$("."+taken_orbs[j][0]).css("opacity","1");
			$("."+taken_orbs[j][0]).css("cursor","pointer");
			$("."+taken_orbs[j][0]).attr("onclick","");
		}
		special();
		colors(taken_orbs,"normal");
		special();
	}

	//hover on orbs effect

	/**-------------------------------------------------------------------------**/
	//Levitation hover
	var dragging = false;
	$('.button').mousedown(function(){
	  dragging=true;
	  console.log(dragging);
	});

	$('.button').mouseup(function(){
	  dragging=false;
	  console.log(dragging);
	});

	$('.button').mouseenter(function(){

	  if (dragging==false && $(this).attr("id")!=""){
	    console.log('mouse enter');
			$('.dragtext').animate({"opacity":"1"},200,function(){});
			$(this).animate({"top":"-=10px"},200,function(){});
			var position = $(this).attr("class").split(' ')[1];
			for (var x in taken_orbs) {
				if (taken_orbs[x][0] == position){
					$(this).css("background-image", "url("+taken_orbs[x][2]+")");

					$(this).css("background-size", "cover");
				}
				// for showing my dreams background
				for (var y in my_shelf_spot){




				$(this).css({"background-image":"url("+my_dreams_dic["20"+y][2]+")",
				"background-size":"30px"});

		        }
			}
		}
	});

	$('.button').mouseleave(function(){
		if (dragging==false){
			console.log('mouse leave');
			$(this).animate({"top":"+=10px"},200,function(){});
			$('.dragtext').animate({"opacity":"0"},200,function(){});
			$(this).css("background-image", "");
			colors(taken_orbs,"normal");
			colors(my_dreams_dic,"myorbs");
			special();
		}
	});
	/**-------------------------------------------------------------------------**/
	/**------------------------------------------------------------------------**/
	//On modal close
$("#viewdreamorb").click(function () {
	  //revert orb to original position
	  $(".button").animate({
	    "left": $(".button").data('originalLeft'),
	    "top": $(".button").data('originalTop')},
	    400);
	    $(".chute").css("background","");
	  // $(".button").animate({
	  //   'left': $(".button").data('originalLeft'),
	  //   'top': $(".button").data('originalTop')
	  // });
		dragging=false;
	  console.log(dragging);

		$("#viewdreamorb").fadeOut(500);
	});

		//special orb
		function special() {
			for (var b in taken_orbs) {
				if (taken_orbs[b][3] == maximum_id) {
					console.log("the array id", taken_orbs[b][3]);
					console.log("the max", maximum_id);
					//make the css change you want here
					$(".button." + taken_orbs[b][0]).css("border", "1px dashed #000000");
				}
			}
		}

		//color function
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
				"Dreamtime":["0px 0px 30px #000000","#ffffff url(abstract2.jpg))"]
			}
			if (type="normal"){
				for (h in orb_data) {
					$(".button." + orb_data[h][0]).css("box-shadow", emo_color[orb_data[h][1]][0]);
					$(".button." + orb_data[h][0]).css("background",emo_color[orb_data[h][1]][1]);
				};
			} else if(type="myorbs"){
				for (k in my_shelf_spot) {
					console.log(k);
					$(".button." + k).css("box-shadow", emo_color[orb_data[k][1]][0]);
					$(".button." + k).css("background",emo_color[orb_data[k][1]][1]);
				}
			}
		}




	});
