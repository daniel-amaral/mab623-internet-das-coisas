var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
  console.log("ready");
  var led = new five.Led(9);
  
  led.fadeIn();
 // Toggle the led after 5 seconds (shown in ms)
 this.wait(5000, function() {
 led.fadeOut();
 });

  /*this.repl.inject({
    led: led
  })*/
});