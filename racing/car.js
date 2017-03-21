	var carX = 75;
	var carY = 75;
	var carSpeed = 0;
	var framesPerSecond = 30;
	var carPic = document.createElement("img");
	var carPicLoaded = false;
	var carAng = (-0.5 * Math.PI);
	

	const GROUNDSPEED_DECAY_MULT = 0.94;
	const DRIVE_POWER = 0.5;
	const REVERSE_POWER = 0.2;
	const TURN_RATE = 0.03;
	const MIN_TURN_SPEED = 0.5;

	function carDraw(){
		if(carPicLoaded){
			drawBitmapCenteredAtLocationWithRotation(carPic, carX, carY, carAng);
		}
	}

	function carReset(){
		for(var i = 0; i < trackGrid.length; i++){
			if(trackGrid[i] === TRACK_PLAYER){
				var tileRow = Math.floor(i/TRACK_COLS);
				var tileCol = i%TRACK_COLS;
				carX = tileCol * TRACK_W + 0.5*TRACK_W;
				carY = tileRow * TRACK_H + 0.5*TRACK_H;
				trackGrid[i] = TRACK_ROAD;
				document.getElementById("debugText").innerHTML = "Car starting at tile: (" + tileCol + ", " + tileRow + ") " + "Pixel coordinate: (" + carX + ", " + carY + ")";
				break;
			}
		}
		
	}

	function carInit(){
		carPic.onload = function(){
			carPicLoaded = true;
		};
		carPic.src = "player1.png";
		carReset();
	}