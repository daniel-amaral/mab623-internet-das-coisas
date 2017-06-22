'use strict'

var express = require('express')
var path = require('path');

var app = express()
app.use(express.static(__dirname + '/public'));
const port = 3000

var bodyParser = require('body-parser')
app.use(bodyParser.json())

var Board = require("firmata")
var board
var SW_SERIAL0

Board.requestPort(function(error, port) {
	if (error) {
		console.log(error);
		return;
	}
	
	console.log("Conectando na porta "+ port.comName);
	
	board = new Board(port.comName);


	board.on("ready", function() {
		
		console.log("READY");
		
		
		SW_SERIAL0 = board.SERIAL_PORT_IDs.SW_SERIAL0;
		var maxBytesToRead = 4;
		
		
		board.serialConfig({
			portId: SW_SERIAL0,
			baud: 9600,
			bytesToRead: 3,
			rxPin: 2,
			txPin: 3
		});

		board.serialRead(SW_SERIAL0, function(data) {
			console.log("data read from cereal");
			console.log(new Buffer(data).toString("hex"));
		});
		
		
		
		for (var pin in board.pins) {
			var modes = board.pins[pin].supportedModes;
			for (var mode in modes) {
				if (modes[mode] === board.MODES.SERIAL) {
					console.log("serial pin: " + pin);
				}
			}
		}

		
	
	});

});

var sendCmdToArduino = function(cmd){
	var bytesCmd = [0xA1, 0xF1, 0x83, 0x55]
	
	switch (cmd){
		case 'liga/desliga':
			bytesCmd.push(0x90)
			break
		case 'up':
			bytesCmd.push(0xB0)
			break
		case 'down':
			bytesCmd.push(0xB2)
			break
		case 'enter':
			bytesCmd.push(0x85)
			break
		case 'menu':
			bytesCmd.push(0x9A)
			break
		case 'esc':
			bytesCmd.push(0x84)
			break
		default:
			return 500;
		
	}

	board.serialWrite(SW_SERIAL0, bytesCmd);
	console.log("Enviei :DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
	return 200;
}

app.put('/send-remote-control-cmd', (req, res) => {
	var cmd = req.body.cmd
	console.log('requested cmd: ', cmd);
	var code = sendCmdToArduino(cmd)
	res.sendStatus(code)
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/public', 'index.html'))
})

app.listen(port, () => {
	console.log('\nApplication running on http://localhost:%d', port, '\n')
})