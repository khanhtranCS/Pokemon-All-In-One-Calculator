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
			alert("get here!!!");
			sendResponse({msg: "great!!"});
			//getName(sendResponse);
		}
	}
);