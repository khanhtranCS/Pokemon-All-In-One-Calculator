var resultHTML = "";
var JSON_string = "";
// fetching data for poke's location
requestPokeLoc();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
			// console.log("message recieved!!!");
			// if (request.method == "getName") {
			// 	alert("getheare!!!");
			// 	chrome.tabs.length({active:true, currentWindow: true}, function(tabs)) {
			// 		if(tabs.length === 0) {
			// 			sendResponse({});
			// 			return;
			// 		}
			// 		tabURL = tabs[0];
			// 		sendResponse({data:"data sent!"});
			// 	});
			// }
			// if (request.greeting == "name") {
			// 	//alert("get here!!!");
			// 	requestHTML();
			// 	sendResponse({msg: "great!!"});
			// 	//getName(sendResponse);
			// }
			if (request.type == "CPSearcher") {
				var poke_name = request.name;
				var poke_cp = request.cp;
				var poke_id = request.id;
				requestCPData(poke_name, poke_cp, poke_id, function() {
					sendEvolveResult();
				});
				// requestHTML(poke_name, poke_cp, poke_id);
				// if (resultHTML != "") {
				// 	sendResponse({msg: resultHTML});
				// 	// resert the html after sent successfully
				// 	resultHTML = "";
				// }
			} else if (request.type == "poke_snipe") {
				//console.log("newest json_String " + JSON_string);
				if (JSON_string != "") {
					sendResponse({msg: JSON_string});
				} else {
					console.log("error!!!");
				}
			} else if (request.type = "IVCalculator") {
				//console.log("IVCalculator message recieved");
				var poke_id = request.id;
				var poke_cp = request.cp;
				var poke_hp = request.hp;
				var poke_dust = request.dust;

				requestIVData(poke_id, poke_cp, poke_hp, poke_dust, function() {
					sendIVResult();
				});

			}
		}
);

// callback function for sending data of CP Calculator that being fetched
function sendEvolveResult() {
	//console.log("callback function is called with data of " + resultHTML);
	if (resultHTML != ""){
		chrome.runtime.sendMessage({type: "poke_evolve", msg: resultHTML});
	}

}

function sendIVResult() {
	chrome.runtime.sendMessage({type: "iv_cal_result"});
}

function requestIVData(poke_id, poke_cp, poke_hp, poke_dust, callback) {
	var url_link = "https://pokemon.gameinfo.io/tools/iv-calculator?hl=en#"+poke_id+","+poke_cp+","+poke_hp+","+poke_dust;
	console.log(url_link);
	$.ajax({
		url: "https://pokemon.gameinfo.io/tools/iv-calculator?hl=en#WzE0OSxbWzIyMzgsMTIzLDMwMDBdXSwxLFswLDAsIiIsW11dLDBd",
		dataType:"text",
		success: function (data) {
			console.log("got here");
			console.log("IV data " + data);
		}
	});
}



function requestCPData(poke_name, poke_cp, poke_id, callback) {
	$.ajax({
		url: "https://pokeassistant.com/main/evolver?utf8=%E2%9C%93&search_pokemon_name=" + poke_name +"&search_cp=" + poke_cp + "&search_pokemon_id=" + poke_id + "&locale=en&commit=Evolve",
		dataType: "text",
		success: function(data) {
			//console.log("fetch data sucessfully");
			resultHTML = data;
			callback();
		}
	});
}

function requestHTML(poke_name, poke_cp, poke_id) {
	//console.log("poke cp is: " + poke_cp);
	var request = new XMLHttpRequest();
	var url = "https://pokeassistant.com/main/evolver?utf8=%E2%9C%93&search_pokemon_name=" + poke_name +"&search_cp=" + poke_cp + "&search_pokemon_id=" + poke_id + "&locale=en&commit=Evolve";
	//console.log("current link being fetch: " + url);
	//console.log("url is " + url);
	request.onload = processInfo;
	request.open('GET', url, true);
	request.send();

	// function alertInfo() {
	// 	alert("current " + request.responseXML);
	// }
}

function processInfo() {
	resultHTML = this.responseText;
}

// function ajax_evolver() {
// 	return $.ajax({})
// }

function requestPokeLoc() {
	$.getJSON("http://pokesnipers.com/api/v1/pokemon.json", function(data) {
		//console.log(data);
		//console.log(JSON.stringify(data));
		JSON_string = JSON.stringify(data);
		//console.log("this is json_string" + JSON_string);
	}).done(function() {
		//console.log("sucess fetch");
	}).fail(function() {
		//console.log("error");
	});
}