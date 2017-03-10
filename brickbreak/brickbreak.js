$(document).ready(function(){
	var canvas;
	var convasContext;

	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	drawEverything();
	
	function drawEverything(){
		//board
		canvasContext.fillStyle = "black";
		canvasContext.fillRect(0, 0, canvas.width, canvas.height);

		//draw ball
		canvasContext.fillStyle = "white";
		canvasContext.beginPath();
		canvasContext.arc(75, 75, 10, 0, Math.PI*2, true);
		canvasContext.fill();
	}
});
