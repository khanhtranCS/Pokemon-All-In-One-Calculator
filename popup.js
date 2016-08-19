window.onload = function () {
	var request = XMLHttpRequest();
	request.onload = testData;
	request.open('GET',"http://pogotoolkit.com/#selectedPokemon=063&combatPower=123",true);
	request.send();
}

function testData() {
	console.log(this.responseText);
}