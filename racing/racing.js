$(document).ready(function(){
	var carX = 75;
	var carY = 75;
	var carSpeed = 0;
	var framesPerSecond = 30;
	var canvas;
	var convasContext;
	const TRACK_W = 40;
	const TRACK_H = 40;
	const TRACK_GAP = 1;
	const TRACK_COLS = 20;
	const TRACK_ROWS = 15;
	const KEY_LEFT_ARROW = 37;
	const KEY_UP_ARROW = 38;
	const KEY_RIGHT_ARROW = 39;
	const KEY_DOWN_ARROW = 40;
	const GROUNDSPEED_DECAY_MULT = 0.94;
	const DRIVE_POWER = 0.5;
	const REVERSE_POWER = 0.2;
	const TURN_RATE = 0.03;
	const MIN_TURN_SPEED = 0.5;
	var keyHeld_Gas = false;
	var keyHeld_Reverse = false;
	var keyHeld_TurnLeft = false;
	var keyHeld_TurnRight = false;
	var	trackGrid	=		   [1,  1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
								1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,
								1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
								1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,
								1,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	1,
								1,	0,	0,	1,	1,	0,	0,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	1,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,
								1,	1,	1,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,
								1,	0,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,
								1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1];
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	var carPic = document.createElement("img");
	var carPicLoaded = false;
	var carAng = 0;
	carPic.onload = function(){
		carPicLoaded = true;
	}
	carPic.src = "player1.png";
	
	carReset();

	setInterval(function(){
		drawEverything(); 
		moveEverything();
    }, 1000/framesPerSecond);

	
	function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
		canvasContext.fillStyle = fillColor;
		canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
	}

	function colorCircle(centerX, centerY, radius, fillColor){
		canvasContext.fillStyle = fillColor;
		canvasContext.beginPath();
		canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
		canvasContext.fill();
	}

	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");

		drawTracks();

		//draw car
		carDraw();	
	}

	function carDraw(){
		if(carPicLoaded){
			drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
		}
	}

	function drawBitmapCenteredAtLocationWithRotation(graphic, atX, atY, withAngle){
		canvasContext.save();//allows us to undo translate movement and rotate spin
		canvasContext.translate(atX,atY); //sets the point where our graphic will go
		canvasContext.rotate(withAngle);//sets the rotation
		canvasContext.drawImage(graphic, -graphic.width/2, -graphic.height/2); //center, draw
		canvasContext.restore(); //undo the translation movement and rotation since save()
		
	}

	function drawTracks(){
		for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){
			for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
				if(isTrackAtTileCoord(eachCol, eachRow)){
					var trackLeftEdgeX = eachCol * TRACK_W;
					var trackTopEdgeY = eachRow * TRACK_H;
					colorRect(trackLeftEdgeX, trackTopEdgeY, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, "blue");
				}
			}
		}

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
	    carX += Math.cos(carAng) * carSpeed;
	    carY += Math.sin(carAng) * carSpeed;
		bounceOffTrackAtPixelCoord(carX, carY);

		carSpeed *= GROUNDSPEED_DECAY_MULT;
	}


	function bounceOffTrackAtPixelCoord(pixelX, pixelY){
		var tileCol = pixelX/TRACK_W;
		var tileRow = pixelY/TRACK_H;

		//round down to nearest whole number
		tileCol = Math.floor(tileCol);
		tileRow = Math.floor(tileRow);

		//first check whether the car is within any part of the track wall
		if(tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS){
			return false; // bail out of function to avoid illegal array position usage
		}

		var trackIndex = trackTileToIndex(tileCol, tileRow);

		if(trackGrid[trackIndex] === 1){
			//Checks the previous col or row of the car
			var prevBallX = carX - carSpeedX;
			var prevBallY = carY - carSpeedY;
			var prevTileCol = Math.floor(prevBallX / TRACK_W);
			var prevTileRow = Math.floor(prevBallY / TRACK_H);

			var bothTestsFailed = true;

			//must come in horizontally
			if(prevTileCol != tileCol){
				var adjacentTrackIndex = trackTileToIndex(prevTileCol, tileRow);
				//make sure the side we want to reflect off isn't blocked
				if(trackGrid[adjacentTrackIndex] != 1){
					carSpeedX *= -1;
					bothTestsFailed = false;
				}
			}

			//must come in vertically
			if(prevTileRow != tileRow){
				var adjacentTrackIndex = trackTileToIndex(tileCol, prevTileRow);
				//make sure the side we want to reflect off isn't blocked
				if(trackGrid[adjacentTrackIndex] != 1){
					carSpeedY *= -1;
					bothTestsFailed = false;
				}
			}

			// we hit an "armpit" on the inside corner, flip both to avoid going into it
			if(bothTestsFailed){
				carSpeedX *= -1;
				carSpeedY *= -1;
			}

			
		}

		
	}

	function trackTileToIndex(tileCol, tileRow){
		return(tileCol + TRACK_COLS*tileRow);
	}

	function isTrackAtTileCoord(trackTileCol, trackTileRow){
		var trackIndex = trackTileCol + TRACK_COLS*trackTileRow;
		return (trackGrid[trackIndex] == 1);
	}

	function carReset(){
		carX = canvas.width/2 + 50;
		carY = canvas.height/2;
	}

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

	function keyPressed(evt){
		setKeyHoldState(evt.keyCode, true);
		evt.preventDefault();
	}

	function keyReleased(evt){
		setKeyHoldState(evt.keyCode, false);
	}

	function setKeyHoldState(thisKey, setTo){
		if(thisKey === KEY_LEFT_ARROW){
			keyHeld_TurnLeft = setTo;
		}
		if(thisKey === KEY_RIGHT_ARROW){
			keyHeld_TurnRight = setTo;
		}
		if(thisKey === KEY_UP_ARROW){
			keyHeld_Gas = setTo;
		}
		if(thisKey === KEY_DOWN_ARROW){
			keyHeld_Reverse = setTo;
		}
	}

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);	
});