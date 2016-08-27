window.onload = function() {
	document.getElementById("evolve").onclick = getCP;
}

function getCP() {
	var poke_cp = document.getElementById("cp_input").value;
	var poke_name = document.getElementById("op_animal").textContent;
	console.log("poke_name is " + poke_name);
	var poke_id = document.getElementById("op_animal").value;
	console.log("poke_id is " + poke_id);
	if (poke_cp == "") {
		alert("please input poke cp");
	} else {
		chrome.runtime.sendMessage({name: poke_name, cp: poke_cp, id: poke_id}, 
		function(response) {
			console.log(response.msg);
			var resultDiv = document.createElement("div");
			resultDiv.innerHTML = response.msg;
			console.log(resultDiv);
			var lst_evolve = resultDiv.getElementsByClassName("table evolvetable")[0].getElementsByClassName("evolverow");
			console.log(lst_evolve.length);
			var result_table = document.getElementById("result");
			for (var i = 0; i < lst_evolve.length; i++) {
				var tr_el = document.createElement("tr");
				console.log("iter: " + i);
				// first td of tr, which contain poke name
				var lst_td = lst_evolve[i].getElementsByTagName("td");
				// possible involve value
				// var big_val = lst_evolve[i].getElementsByClassName("evolvebig")[0].textContent;
				// var small_val = lst_evolve[i].getElementsByClassName("evolvesmall");
				console.log("poke name is " + lst_td[0].textContent);
				var td_name = document.createElement("td");
				td_name.innerHTML = lst_td[0].textContent;
				var row_cp = lst_td[1].outerHTML;
				tr_el.innerHTML = td_name.outerHTML;
				tr_el.innerHTML += row_cp;

				result_table.appendChild(tr_el);
				//console.log("second td" + td_value.outerHTML);
				//	console.log("big value: " + big_val[0].textContent);
				// for (var j = 0; j < small_val.length; j++) {
				// 	console.log("small value: " + small_val[j].textContent);
				// }

			}
			//console.log(resultDiv.getElementsByClassName("table evolvetable")[0].getElementsByClassName("evolverow")[0].outerHTML);
			document.getElementById("display").innerHTML = resultDiv.getElementsByClassName("table evolvetable")[0].outerHTML;
		});
	}

}