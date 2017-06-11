var mqtt = require('mqtt');
var five = require("johnny-five");

var client = mqtt.connect('mqtt://test.mosquitto.org');

var temperature = 0;
var pressure = 0;

var board = new five.Board;
board.on("ready", function() {
	var bme280 = new five.Multi({
		address: 0x76, // Generic BME280 boards use non-default address
		controller: "BME280"
	});
	
	bme280.on("data", function() {
		temperature = this.thermometer.celsius;
		pressure = this.barometer.pressure;			
	});
});

client.on('connect', function () {
 console.log("Conectado ao Broker");
 client.subscribe('bme-raspokeberry');
 setInterval(()=>{
  client.publish('bme-raspokeberry', 'Temperatura: ' + temperature + ', Pressao: ' + pressure);
  console.log('published ');
 }, 4000);
})
