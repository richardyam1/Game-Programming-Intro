$(document).ready(function(){
	var carX = 75;
	var carY = 75;
	var carSpeedX = 6;
	var carSpeedY = 6;
	var framesPerSecond = 30;
	var canvas;
	var convasContext;
	const TRACK_W = 40;
	const TRACK_H = 40;
	const TRACK_GAP = 1;
	const TRACK_COLS = 20;
	const TRACK_ROWS = 15;
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
		carAng += 0.2;
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
		//bounce car off wall
		if(carX > canvas.width || carX < 0){
			carSpeedX *= -1;
		}

		

		//if car goes over bottom 
		if (carY > canvas.height){
			carReset();
		}

		else if(carY < 0){
			carSpeedY *= -1;
		}

		//moves car horizontally
		carX += carSpeedX;

		//moves car vertically
		carY += carSpeedY;

		bounceOffTrackAtPixelCoord(carX, carY);
			
		
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

	
});