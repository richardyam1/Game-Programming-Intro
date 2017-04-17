var canvas;
var convasContext;
const PLAYER_START_UNITS = 8;
var playerUnits = []; 
var selectedUnits = [];
var lassoX1 = 0;
var lassoY1 = 0;
var lassoX2 = 0;
var lassoY2 = 0;
var isMouseDragging = false;

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
		if(isMouseDragging){
			lassoX2 = mousePos.x;
			lassoY2 = mousePos.y;
		}
	});
	/*
	$(canvas).click(function(evt){
		var mousePos = calculateMousePos(evt);
		for(var i = 0; i < playerUnits.length; i++){
			 playerUnits[i].gotoNear(mousePos.x, mousePos.y);
			
		}
	})
	*/
	$(canvas).mousedown(function(evt){
		var mousePos = calculateMousePos(evt);
		lassoX1 = mousePos.x;
		lassoY1 = mousePos.y;
		lassoX2 = lassoX1;
		lassoY2 = lassoY1;
		isMouseDragging = true; 
	});

	$(canvas).mouseup(function(evt){
		isMouseDragging = false;

		selectedUnits = [];

		for(var i = 0; i < playerUnits.length; i++){
			if(playerUnits[i].isInBox(lassoX1, lassoY1, lassoX2, lassoY2)){
				selectedUnits.push(playerUnits[i]);
			}
		}
		document.getElementById("debugText").innerHTML = "Selected " + selectedUnits.length + " units";
	});

	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");
		for(var i = 0; i < playerUnits.length; i++){
			playerUnits[i].draw();
		}

		for(var i = 0; i < selectedUnits.length; i++){
			selectedUnits[i].drawSelectionBox();
		}
		if(isMouseDragging){
			coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, "yellow");
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
