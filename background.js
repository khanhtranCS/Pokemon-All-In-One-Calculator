var resultHTML = "";

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("message recieved!!!");
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
		poke_name = request.name;
		poke_cp = request.cp;
		poke_id = request.id;
		requestHTML(poke_name, poke_cp, poke_id);
		if (resultHTML != null) {
			sendResponse({msg: resultHTML});
		}
	}
);

function requestHTML(poke_name, poke_cp, poke_id) {
	//console.log("poke cp is: " + poke_cp);
	var request = new XMLHttpRequest();
	var url = "https://pokeassistant.com/main/evolver?utf8=%E2%9C%93&search_pokemon_name=" + poke_name +"&search_cp=" + poke_cp + "&search_pokemon_id=" + poke_id + "&locale=en&commit=Evolve";
	//console.log("current link being fetch: " + url);
	//console.log("url is " + url);
	request.open('GET', url, true);
	request.onload = function () {
		// clera out previous resultHTML so that the it'll not interfere new response html
		resultHTML = "";
		//console.log("new data updated!!!");
		resultHTML += request.responseText;

		//console.log(resultHTML);
	}
	request.send();

	// function alertInfo() {
	// 	alert("current " + request.responseXML);
	// }
}

// function alertInfo() {

// 	console.log("current " + this.responseText);
// }