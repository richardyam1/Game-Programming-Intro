var canvas;
var convasContext;
const PLAYER_START_UNITS = 20;
const ENEMY_START_UNITS = 15;
var enemyUnits = [];
var playerUnits = []; 


$(document).ready(function(){
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	var framesPerSecond = 30;
	setInterval(function(){
		drawEverything(); 
		moveEverything();
    }, 1000/framesPerSecond);

	$(canvas).mousemove(mousemoveHandler);
	$(canvas).mousedown(mousedownHandler);
	$(canvas).mouseup(mouseupHandler);

	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");
		for(var i = 0; i < playerUnits.length; i++){
			playerUnits[i].draw();
		}

		for(var i = 0; i < enemyUnits.length; i++){
			enemyUnits[i].draw();
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

		for(var i = 0; i < enemyUnits.length; i++){
			enemyUnits[i].move();
		}
	}

	for(var i = 0; i < PLAYER_START_UNITS; i++){
		var spawnUnit = new unitClass();
		spawnUnit.resetAndSetPlayerTeam(true);
		playerUnits.push(spawnUnit);
	}

	for(var i = 0; i < ENEMY_START_UNITS; i++){
		var spawnUnit = new unitClass();
		spawnUnit.resetAndSetPlayerTeam(false);
		enemyUnits.push(spawnUnit);
	}

	
});
