var canvas;
var canvasContext;

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

	populateTeam(playerUnits, PLAYER_START_UNITS, true);
	populateTeam(enemyUnits, ENEMY_START_UNITS, false);
});

	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");
		for(var i = 0; i < allUnits.length; i++){
			allUnits[i].draw();
		}

		for(var i = 0; i < selectedUnits.length; i++){
			selectedUnits[i].drawSelectionBox();
		}
		if(isMouseDragging){
			coloredOutlineRectCornerToCorner(lassoX1, lassoY1, lassoX2, lassoY2, "yellow");
		}
	}


	function moveEverything(){
		for(var i = 0; i < allUnits.length; i++){
			allUnits[i].move();
		}
		removeDeadUnits();
	}



	

	

