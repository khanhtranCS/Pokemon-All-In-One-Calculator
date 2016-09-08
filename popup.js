var success = false;
window.onload = function() {
	document.getElementById("evolve").onclick = getCP;
	document.getElementById("cp_button").onclick = setVisible;
	document.getElementById("snipe_button").onclick = setVisible;
	document.getElementById("iv_button").onclick = setVisible;
	document.getElementById("iv_cal_btn").onclick = getIVResult;
	// var timer = setInterval(processSnipe, 1000);
	processSnipe();
	document.getElementById("refresh_btn").onclick = processSnipe;
}

function setVisible() {
	// if the cp button is clicked
	if (this.id == "cp_button") {
		setVisibleByType("block", "none", "none");
	} else if(this.id == "iv_button") {  // if iv button is clicked
		setVisibleByType("none", "block", "none");
	} else if(this.id == "snipe_button") {  // if snipe button is clicked
		setVisibleByType("none", "none", "block");
	}
	//document.getElementById("cp_cal").style.display = "block";
}

/*
 * function that help reduce code redundancy
 * @para string that represent either block or none
 * which will be used for interactive display
 */
function setVisibleByType(cp, iv, snipe) {
	document.getElementById("cp_cal").style.display = cp;
	document.getElementById("iv_cal").style.display = iv;
	document.getElementById("snipe").style.display = snipe;
}

function getCP() {
	// console.log("getCP is called");
	document.getElementById("status").style.display = "block";
	document.getElementById("result").style.display = "none";
	document.getElementById("result").innerHTML = "";
	var poke_cp = document.getElementById("cp_input").value;
	//console.log("current cp" + poke_cp);
	var poke_name = document.getElementById("op_animal_cp").textContent;
	//console.log("poke_name is " + poke_name);
	var poke_id = document.getElementById("op_animal_cp").value;
	//console.log("poke_id is " + poke_id);
	if (poke_cp == "" || !Number.isInteger(parseInt(poke_cp))) {
		document.getElementById("result").innerHTML = "Please Input correct CP";
	} else {
		chrome.runtime.sendMessage({type: "CPSearcher",name: poke_name, cp: poke_cp, id: poke_id});
	}
}

function getIVResult() {
	//var poke_name = document.getElementById("op_animal_iv").text;
	var poke_id = document.getElementById("op_animal_iv").value;
	var poke_cp = parseInt(document.getElementById("cp_field").value);
	var poke_hp = parseInt(document.getElementById("hp_field").value);
	var poke_dust = parseInt(document.getElementById("dust_field").value);
	if (poke_cp == "" || poke_hp == "" || poke_dust == ""
		|| !Number.isInteger(poke_cp) || !Number.isInteger(poke_hp) || !Number.isInteger(poke_dust)) {
		document.getElementById("iv_result").innerHTML = "Please input correct value";
	} else {
		chrome.runtime.sendMessage({type:"IVCalculator", id: poke_id, cp: poke_cp, hp: poke_hp, dust: poke_dust});
	}
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendReponse) {
		if(request.type == "poke_evolve") {
			var resultDiv = document.createElement("div");
			//document.getElementById("status").style.display = "block";
			resultDiv.innerHTML = request.msg;
			var lst_evolve = resultDiv.getElementsByClassName("table evolvetable")[0].getElementsByClassName("evolverow");

			var result_table = document.getElementById("result");
			var row_cp_name = document.createElement("tr");
			var row_name = document.createElement("td");
			row_name.innerHTML = "Name";
			var row_cp = document.createElement("td")
			row_cp.innerHTML = "CP";
			row_cp_name.appendChild(row_name);
			row_cp_name.appendChild(row_cp);
			result_table.appendChild(row_cp_name);
			for (var i = 0; i < lst_evolve.length; i++) {
				var tr_el = document.createElement("tr");
				//console.log("iter: " + i);
				// first td of tr, which contain poke name
				var lst_td = lst_evolve[i].getElementsByTagName("td");
				// possible involve value
				//console.log("poke name is " + lst_td[0].textContent);
				var td_name = document.createElement("td");
				// retrive pokemon's name, and put it into column div
				td_name.innerHTML = lst_td[0].textContent.replace(/[0-9]/g, '');
				var row_cp = lst_td[1].outerHTML;
				//console.log(row_cp);
				tr_el.innerHTML = td_name.outerHTML;
				tr_el.innerHTML += row_cp;

				result_table.appendChild(tr_el);
				//console.log("second td" + td_value.outerHTML);
				//	console.log("big value: " + big_val[0].textContent);
				// for (var j = 0; j < small_val.length; j++) {
				// 	console.log("small value: " + small_val[j].textContent);
				// }

			}
			document.getElementById("result").style.display = "inline-block";
			document.getElementById("status").style.display = "none";
		}
});

function processSnipe() {
	chrome.runtime.sendMessage({type: "poke_snipe"},
		function(response) {
			display_snipe_info(JSON.parse(response.msg));
		});
}

function display_snipe_info(poke_locations) {
	lst_locations = poke_locations.results;
	var result = document.getElementById("snipe_result");
	result.innerHTML = "";
	for (var i = 0; i < lst_locations.length; i++) {
		var curr_poke = lst_locations[i];
		if (curr_poke.rarity == "rare" || curr_poke.rarity == "very_rare"
				|| curr_poke.rarity == "special" || curr_poke.rarity == "legendary") {

			// create random color
			var r = Math.round(Math.random() * 256);
			var g = Math.round(Math.random() * 256);
			var b = Math.round(Math.random() * 256);
			
			// create rbg(r,b,g) color in string representative
			//var rbg_color = "rbg(" + r + ", " + b + ", " + g + ")";
			

			var whole_poke_div = document.createElement("div");
			whole_poke_div.className = "whole_poke_div";
			//whole_poke_div.style.border = "5px solid " + rgb(r,g,b);

			// getting poke's icon
			var img = document.createElement("img");
			img.src = curr_poke.icon;
			img.alt = curr_poke.name + "img";
			img.className = "poke_icon";

			var name_coords_div = document.createElement("div");
			name_coords_div.id = "name_coords_div";

			// create a name span for the pokemon
			var name_span = document.createElement("span");
			name_span.innerHTML = curr_poke.name;
			name_span.className = "poke_name_span";
			name_span.style.color = rgb(r, g, b);

			// create coordinate div with a "location icon" and "actual coordinate"
			var coords_div = document.createElement("div");
			var coords_span = document.createElement("span");
			var location_icon = document.createElement("img");
			location_icon.src = "location_icon.png";
			location_icon.alt = "loc_icon";
			location_icon.className = "loc_icon";
			// create pokesniper2 redirectlink
			var snipe_icon = document.createElement("img");
			var poke2_link = document.createElement("a");
			poke2_link.href = "pokesniper2://" + curr_poke.name + "/" + curr_poke.coords;
			snipe_icon.src = "crosshair.png";
			snipe_icon.alt = "crosshair";
			snipe_icon.className = "snipe_icon";
			poke2_link.appendChild(snipe_icon);
			coords_div.appendChild(location_icon);
			coords_span.innerHTML = curr_poke.coords;
			coords_span.appendChild(poke2_link);
			coords_span.style.color = rgb(r, g, b);;
			coords_div.appendChild(coords_span);
			coords_span.className = "coords_span";

			// appending process to create complete version of each poke div
			// a complete version will have timer, poke's name, and poke's location
			name_coords_div.appendChild(name_span);
			name_coords_div.appendChild(coords_div);

			var time = document.createElement("span");
			time.id = "time_span";

			// retrive time left from current time and source time (provided by API)
			var curr_time = new Date();
			var src_time = new Date(curr_poke.until);
			var time_left = getTimeLeft (curr_time, src_time);
			time.innerHTML = time_left;
			time.style.color = rgb(r, g, b);

			whole_poke_div.appendChild(img);
			whole_poke_div.appendChild(name_coords_div);
			whole_poke_div.appendChild(time);
			//whole_poke_div.appendChild(coords_div);
			result.appendChild(whole_poke_div);
		}
	}	
}

function getTimeLeft(curr_time, src_time) {
	var curr_hour = parseInt(curr_time.getHours());
	var src_hour = parseInt(curr_time.getHours());
	var curr_minutes = parseInt(curr_time.getMinutes());
	var src_minutes = parseInt(src_time.getMinutes());
	var curr_sec = parseInt(curr_time.getSeconds());
	var src_sec = parseInt(src_time.getSeconds());
	var time_type = " Minutes left";

	if (curr_hour == src_hour) {
		console.log("current minutes " + curr_minutes);
		console.log("src minutes " + src_minutes);
		console.log("current hour " + curr_hour);
		console.log("src hour " + src_hour);
		var time_left = src_minutes - curr_minutes;
		if (time_left <= 0) {
			time_type = " Seconds left"
			time_left = (src_sec - curr_sec);
			if (time_left <= 0) {
				return "Disappeared";
			}
		}
	} else if (src_hour > curr_hour) {
		var time_left = src_minutes + (60 - curr_minutes);

	}

	return time_left + time_type;

}


function rgb(r, b, g) {
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
