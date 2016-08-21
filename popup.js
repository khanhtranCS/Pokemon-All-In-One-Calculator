chrome.runtime.sendMessage({greeting:"name"}, 
	function(response) {
		alert(response);
	});
