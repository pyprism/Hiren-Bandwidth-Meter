

var range_rec = 512;  // KBps
var range_snd = 512;  // KBps
var rate_rec = 0;
var rate_snd = 0;
var seconds = 1;
	function getvar() {
	  $.ajax({
	      'async': false,
	      'global': false,
	      'url':"/graph",
	      'dataType': "json",
	      'success': function (data) {
	      	var new_rec = data.down;
			var new_snd = data.up;
	        //document.getElementById("chart").innerHTML="Receive: " + data.down+" Send: "+data.up;
	        if ( typeof(old_rec) != "undefined" && typeof(old_snd) != "undefined") 
			{ 
				var bytes_rec = new_rec - old_rec;
				var bytes_snd = new_snd - old_snd;

				rate_rec = bytes_rec / seconds / 1024;
				rate_snd = bytes_snd / seconds / 1024;
				var ar,as;
				if(rate_rec>124)
					ar = Math.round((rate_rec/128)*100)/100 +" Mbps";
				else
					ar = Math.round(rate_rec*100)/100 +" KiBps";
				if(rate_snd>124)
					as = Math.round((rate_snd/128)*100)/100 +" Mbps";
				else
					as = Math.round(rate_snd*100)/100 +" KiBps";

				// Check over/under flow
				if ( rate_rec > range_rec  || rate_rec < 0 )
					rate_rec = old_rate_rec;
				else
					old_rate_rec = rate_rec;

				if ( rate_snd > range_snd  || rate_snd < 0 )
					rate_snd = old_rate_snd;
				else
					old_rate_snd = rate_snd;

				document.getElementById("rec_result").innerHTML="Receive: " + ar +" <-||-> Total Reveive: "+bytesToSize(data.down);
				document.getElementById("snd_result").innerHTML="Send: "    + as +" <-||-> Total Send: "+bytesToSize(data.up);
				
			}
			old_rec = new_rec;
			old_snd = new_snd;

	      }
	  });
	  
	};

	
 
  function bytesToSize(bytes) {
	    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	    if (bytes == 0) return 'n/a';
	    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	    if (i == 0) return bytes + ' ' + sizes[i]; 
	    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
	};

window.onload = function() {

    rec_graph = new Graph(
    {
        'id': "rec_graph",
        'interval': 1000,
        'strokeStyle': "#819C58",
        'fillStyle': "#FF0000",
        'gridcolor':"#000000",
		'grid': [100,50],
		'range': [0,range_rec],

        'call': function(){return (Math.round(rate_rec));}
    });

    snd_graph = new Graph(
    {
        'id': "snd_graph",
        'interval': 1000,
        'strokeStyle': "#58819C",
        'gridcolor':"#000000",
        'fillStyle': "#04B404",
		'grid': [100,50],
		'range': [0,range_snd],

        'call': function(){return (Math.round(rate_snd));}
    });

}
window.setInterval("getvar()", 1000);