var os = require("os").networkInterfaces()
var a = new Array();
var increment = 0;
for(var i in os){
	//console.log(i);
	var a[0] = i;
	increment = increment + 1 ;
}
console.log(a);
