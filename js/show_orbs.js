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
			console.log(i);
			console.log("the length",orbs.length);
			//orb generation needs to go here -- call the orb by orbs[i][0]
			var shelf_spot = (Math.floor((Math.random() * 120) + 1));
			//console.log(shelf_spot);
			while (taken_orbs.includes(shelf_spot) === true) {
			 shelf_spot = (Math.floor((Math.random() * 120) + 1));
			 //console.log(shelf_spot);
			 }
			 taken_orbs.push(shelf_spot);
			document.getElementsByClassName(shelf_spot).attr("id", orbs[i][0]);

		}

		console.log("taken orbs", taken_orbs);

			var orbs_to_hide = [];
			 	for (var j=1; j<121; j++) {
			 		orbs_to_hide.push(j);
				}

			for (var m in orbs_to_hide) {
				for (var k in taken_orbs) {
					//console.log(k);
					//console.log(m);
					if ((taken_orbs[k]) == (orbs_to_hide[m])) {
					 	delete orbs_to_hide[m];
					}
				}
			}

			console.log("orbs to hide", orbs_to_hide);

			// var taken_orbs1 = [2,5,7,8]
			// var orbs_to_hide1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
			//
			//
			//
			// for (var m1 in orbs_to_hide1) {
			// 	for (var k1 in taken_orbs1) {
			// 		//console.log(k);
			// 		//console.log(m);
			// 		if ((taken_orbs1[k1]) == (orbs_to_hide1[m1])) {
			// 		 	delete orbs_to_hide1[m1];
			// 		}
			// 	}
			// }

			console.log(orbs_to_hide);

			for (var p in orbs_to_hide) {
			 		$("." + orbs_to_hide[p]).css("opacity", "0");
					$("." + orbs_to_hide[p]).attr("onclick", "return false");
					console.log(orbs_to_hide[p], "was hidden");
				}
				//$(".2").hide();


			// for (var m in taken_orbs) {
			// 	var orbs_to_hide = [];
			// 	for (var j=0; j<121; j++) {
			// 		orbs_to_hide.push(j);
			// 		//console.log(orbs_to_hide);
			// 	}
			// 	taken_orbs.splice(m,1);
			// 	console.log(taken_orbs);
			// 	for (var k in orbs_to_hide) {
			// 		$("." + orbs_to_hide[k]).hide;
			// 	}

			}
			//}

		});



//
// $(document).ready(function(orbs){
// 			for (var i=0; i<orbs.length; i++)  {
// 				console.log(i);
// 				//orb generation needs to go here -- call the orb by orbs[i][0]
// 				var taken_orbs = [];
// 				var shelf_spot = String(Math.floor((Math.random() * 120) + 1));
// 				console.log(shelf_spot);
// 				while (taken_orbs.includes(shelf_spot) === true) {
// 				 shelf_spot = String(Math.floor((Math.random() * 120) + 1));
// 				 console.log(shelf_spot);
// 				 }
// 				taken_orbs.push(shelf_spot);
// 				document.getElementsByClassName(shelf_spot).attr("id", orbs[i][0]);
// 		}
// 			$("#none").hide();
// });




// //populating index with the orbs
// 	function populate(orbs) {
// 		console.log(orbs.length);
// 		for (var i=0; i<orbs.length; i++)  {
// 			console.log(i);
// 			//orb generation needs to go here -- call the orb by orbs[i][0]
// 			var taken_orbs = [];
// 			var shelf_spot = String(Math.floor((Math.random() * 120) + 1));
// 			console.log(shelf_spot);
// 		  while (taken_orbs.includes(shelf_spot) == true) {
// 			 shelf_spot = String(Math.floor((Math.random() * 120) + 1));
// 			 console.log(shelf_spot);
// 			 }
// 			taken_orbs.push(shelf_spot);
// 			//document.getElementsByClassName(shelf_spot).attr("id", orbs[i][0]);
// 	}
