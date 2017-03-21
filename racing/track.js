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
								1,	0,	2,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	1,
								1,	1,	1,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,
								1,	0,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,
								1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1];
	const TRACK_ROAD = 0;
	const TRACK_WALL = 1;
	const TRACK_PLAYER = 2;

	function drawTracks(){
		for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){
			for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
				if(isWallAtTileCoord(eachCol, eachRow)){
					var trackLeftEdgeX = eachCol * TRACK_W;
					var trackTopEdgeY = eachRow * TRACK_H;
					colorRect(trackLeftEdgeX, trackTopEdgeY, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, "blue");
				}
			}
		}

	}

	function checkForTrackAtPixelCoord(pixelX, pixelY){
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

		return (trackGrid[trackIndex] === TRACK_ROAD);

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

	function isWallAtTileCoord(trackTileCol, trackTileRow){
		var trackIndex = trackTileCol + TRACK_COLS*trackTileRow;
		return (trackGrid[trackIndex] == TRACK_WALL);
	}