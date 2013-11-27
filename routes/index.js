var sh = require('execSync');
var con = require('./config.js');

function graph(){
	//need some modification latar !!
	
	var upCommand = "cat /sys/class/net/" + con.inet + "/statistics/tx_bytes";
	var downCommand = "cat /sys/class/net/" + con.inet + "/statistics/rx_bytes"
	var upDT = (sh.exec(upCommand)).stdout;
	var downDT = (sh.exec(downCommand)).stdout;
	var upD = upDT.slice(0,-1);
	var downD = downDT.slice(0,-1); 
	var data = JSON.stringify({ up: upD, down: downD});
	return data;
}


//byte conversation source : http://stackoverflow.com/questions/15900485/correctly-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.graph = function(req , res){
	var data = graph();
	res.format({
		'application/json': function(){
		 res.send(data);
  }
	});
};

