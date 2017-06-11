var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://test.mosquitto.org');
client.subscribe('bme-raspokeberry');
client.on('message', function (topic, message) {
 // message é do tipo Buffer
 console.log(message.toString());
 //client.end();
})
