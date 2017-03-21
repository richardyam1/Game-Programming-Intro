$(document).ready(function(){
	var canvas;
	var convasContext;
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	

	setInterval(function(){
		drawEverything(); 
		moveEverything();
    }, 1000/framesPerSecond);


	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");

		drawTracks();

		//draw car
		carDraw();	
	}

	function moveEverything(){
		if(Math.abs(carSpeed) >= 0.5){
			if(keyHeld_TurnLeft){
				carAng += -TURN_RATE*Math.PI;
			}
			if(keyHeld_TurnRight){
				carAng += TURN_RATE*Math.PI;
			}
		}
		if(keyHeld_Gas){
			carSpeed += DRIVE_POWER;
		}
		if(keyHeld_Reverse){
			carSpeed += -REVERSE_POWER;
		}
		var nextX = carX + Math.cos(carAng) * carSpeed;
		var nextY = carY + Math.sin(carAng) * carSpeed
		if(checkForTrackAtPixelCoord(nextX, nextY)){
			carX = nextX;
			carY = nextY;
		}
		else{
			carSpeed = 0.0;
		}

		carSpeed *= GROUNDSPEED_DECAY_MULT;
	}
	carInit();
	initInput();
		
});