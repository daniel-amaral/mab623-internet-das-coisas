var five = require("johnny-five");
var Galileo = require("galileo-io");
var board = new five.Board({
  io: new Galileo()
});

board.on("ready", function() {
  console.log("ready");
  var led = new five.Led(9);
  
  led.fade({
 easing: "outSine",
 duration: 1000,
 cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
 keyFrames: [0, 250, 25, 150, 100, 125],
 onstop: function() {
 console.log("Animation stopped");
 }

});