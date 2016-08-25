chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
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
		if (request.greeting == "name") {
			//alert("get here!!!");
			requestHTML();
			sendResponse({msg: "great!!"});
			//getName(sendResponse);
		}
	}
);

function requestHTML() {
	var request = new XMLHttpRequest();
	request.open('GET', "https://pokeassistant.com/main/evolver?utf8=%E2%9C%93&search_pokemon_name=Squirtle&search_cp=200&search_pokemon_id=7&locale=en&commit=Evolve", true);
	request.onload = function () {
		var resultHTML = request.responseText;
		console.log(resultHTML);
		var resultDiv = document.createElement("div");
		resultDiv.innerHTML = resultHTML;
		console.log(resultDiv.getElementsByClassName("table evolvetable")[0].innerHTML);

	}
	request.send();

	// function alertInfo() {
	// 	alert("current " + request.responseXML);
	// }
}

// function alertInfo() {

// 	console.log("current " + this.responseText);
// }