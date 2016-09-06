var success = false;
window.onload = function() {
	document.getElementById("evolve").onclick = getCP;
	document.getElementById("cp_button").onclick = setVisible;
	document.getElementById("snipe_button").onclick = setVisible;
	document.getElementById("iv_button").onclick = setVisible;
	processSnipe();
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
	console.log("getCP is called");
	document.getElementById("result").style.display = "none";
	document.getElementById("result").innerHTML = "";
	var poke_cp = document.getElementById("cp_input").value;
	//console.log("current cp" + poke_cp);
	var poke_name = document.getElementById("op_animal").textContent;
	//console.log("poke_name is " + poke_name);
	var poke_id = document.getElementById("op_animal").value;
	//console.log("poke_id is " + poke_id);
	if (poke_cp == "") {
		alert("please input poke cp");
	} else {
		chrome.runtime.sendMessage({type: "CPSearcher",name: poke_name, cp: poke_cp, id: poke_id}, 
		function(response) {
			//console.log(response.msg);
			var resultDiv = document.createElement("div");
			// if response is undefined, call getCP again, so that user need not to click the button again
			if (response == undefined || !success) {
				document.getElementById("result").style.display = "none";
				document.getElementById("status").style.display = "block";
				getCP();
				return;
			}
			document.getElementById("status").style.display = "none";
			resultDiv.innerHTML = response.msg;
			var lst_evolve = resultDiv.getElementsByClassName("table evolvetable")[0].getElementsByClassName("evolverow");
			//console.log(lst_evolve.length);
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
			//console.log(resultDiv.getElementsByClassName("table evolvetable")[0].getElementsByClassName("evolverow")[0].outerHTML);
			//document.getElementById("display").innerHTML = resultDiv.getElementsByClassName("table evolvetable")[0].outerHTML;
		});
	}
}

function processSnipe() {
	chrome.runtime.sendMessage({type: "poke_snipe"},
		function(response) {
			console.log(response.msg);
		});
}