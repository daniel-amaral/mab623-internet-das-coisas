'use strict'

var express = require('express')

var mqtt = require('mqtt')

var mqttClient = mqtt.connect('mqtt://test.mosquitto.org')

const tempBrokerName = 'trabalho-iot-mqtt-temp'
const pressureBrokerName = 'trabalho-iot-mqtt-pressure'
var temperatureData = []
var pressureData = []

var app = express()
app.use(express.static(__dirname + '/public'));
const port = 3000

mqttClient.on('connect', function(){
	console.log('Connected to broker')
	mqttClient.subscribe(tempBrokerName)
	mqttClient.subscribe(pressureBrokerName)
})

mqttClient.on('message', (topic, message) => {
	var msg = message.toString()
	console.log('Message received from ' + topic + ': ', msg)
	switch (topic){
		case tempBrokerName:
			temperatureData.push(msg);
			break;
		case pressureBrokerName:
			pressureData.push(msg);
			break;
	}
})

var path = require('path');

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/temperature-data-from-broker', (req, res) => {
	var temperatureData_copy = []
	for (var msg of temperatureData)
		temperatureData_copy.push(msg)
	temperatureData = []
	res.send(temperatureData_copy)
})

app.get('/pressure-data-from-broker', (req, res) => {
	var pressureData_copy = []
	for (var msg of pressureData)
		pressureData_copy.push(msg)
	pressureData = []
	res.send(pressureData_copy)
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/public', 'index.html'))
})

app.listen(port, () => {
	console.log('Application running on http://localhost:%d', port)
})