var five = require('johnny-five');

var board = new five.Board();

board.on("ready", function() {
	console.log("board ready");
	
	this.pinMode(0, five.Pin.ANALOG);
	this.loop(5000, function(){
		board.analogRead(0, function(voltage) {
			console.log(voltage);
		});
	});  
});