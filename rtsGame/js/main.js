var canvas;
var convasContext;

function calculateMousePos(evt){
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;

	//account for the margins, canvas position on page, scroll amount, etc.
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.left - root.scrollTop;
	return{
		x: mouseX, 
		y: mouseY
	};
}


$(document).ready(function(){
	
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	var framesPerSecond = 30;
	setInterval(function(){
		drawEverything(); 
		moveEverything();
    }, 1000/framesPerSecond);

	$(canvas).mousemove(function(evt){
		var mousePos = calculateMousePos(evt);
		document.getElementById("debugText").innerHTML = "(" + mousePos.x + "," + mousePos.y + ")";
	});
	
	

	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");

		
	}


	function moveEverything(){
	
	}



	
});
