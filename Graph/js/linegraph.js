        //test data it will be passed to the function
		var lineChartData = {
		    //time labels
			labels : ["1s","2s","3s","4s","5s","6s","7s"],
			datasets : [
				{
					//for download
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,1)",
					pointColor : "rgba(220,220,220,1)",
					pointStrokeColor : "#fff",
					data : [65,59,90,81,56,55,40]
				},
				{
					// for upload
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : [28,48,40,19,96,27,100]
				}
			]
			
		}
    //function calls :P
	var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData);
	