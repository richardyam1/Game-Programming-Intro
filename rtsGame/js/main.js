var canvas;
var convasContext;
const PLAYER_START_UNITS = 8;
var playerUnits = []; 
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
	
	$(canvas).click(function(evt){
		var mousePos = calculateMousePos(evt);
		for(var i = 0; i < playerUnits.length; i++){
			 playerUnits[i].gotoNear(mousePos.x, mousePos.y);
			
		}
	})

	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");
		for(var i = 0; i < playerUnits.length; i++){
			playerUnits[i].draw();
		}
	}


	function moveEverything(){
		for(var i = 0; i < playerUnits.length; i++){
			playerUnits[i].move();
		}
	}

	for(var i = 0; i < PLAYER_START_UNITS; i++){
		var spawnUnit = new unitClass();
		spawnUnit.reset();
		playerUnits.push(spawnUnit);
	}

	
});
