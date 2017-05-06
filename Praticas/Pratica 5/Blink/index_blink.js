var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
  console.log("ready");
  var led = new five.Led(9);
  
  led.strobe(1000);

  /*this.repl.inject({
    led: led
  })*/
});