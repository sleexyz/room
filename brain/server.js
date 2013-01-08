/*
 * 
 */

var serialport = require("serialport");
var lastraw; //buffer to holder the last signaled button code


var start = function(handle){
	var SerialPort = serialport.SerialPort;
	var sp = new SerialPort("/dev/ttyUSB0",{
		parser: serialport.parsers.readline("\n"),
		baudrate: 9600
	});

	sp.on("open", function(){
		console.log('open');
		sp.on('data', function(data){
			var raw = parseInt(data, 16);
			rawhandle(raw, handle, serialport);
		});
	});


	sp.on("close", function(){
		console.log('close');
	});
}

var rawhandle(raw, handle){
	var code = raw % 0x10000 //cleaned so every button code is one value
	if(typeof handle[code] === 'function'){
		if(raw != lastraw){
			handle[code](sp.write);
		};
	};
	lastcode = code;
}


exports.start = start;

