	const TRACK_W = 40;
	const TRACK_H = 40;
	const TRACK_COLS = 20;
	const TRACK_ROWS = 15;


	var	trackGrid	=       [	4,	4,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	4,
								4,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	1,
								1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
								1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,
								1,	0,	0,	0,	1,	1,	1,	4,	4,	4,	4,	1,	1,	1,	1,	1,	1,	0,	0,	1,
								1,	0,	0,	1,	1,	0,	0,	1,	4,	4,	1,	1,	0,	0,	0,	1,	1,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	0,	0,	1,	4,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	1,
								1,	2,	2,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	5,	0,	0,	1,	0,	0,	1,	
								1,	0,	0,	1,	0,	0,	5,	0,	0,	0,	5,	0,	0,	1,	0,	0,	1,	0,	0,	1,
								1,	1,	1,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	5,	0,	0,	1,
								1,	1,	5,	1,	0,	0,	1,	1,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,
								0,	3,	0,	0,	0,	0,	1,	4,	1,	1,	0,	0,	1,	1,	0,	0,	0,	0,	0,	1,
								0,	3,	0,	0,	0,	0,	1,	4,	4,	1,	1,	1,	1,	1,	1,	0,	0,	0,	1,	1,
								1,	1,	5,	1,	1,	1,	1,	4,	4,	4,	4,	4,	4,	1,	1,	1,	1,	1,	1,	1 ];
	const TRACK_ROAD = 0;
	const TRACK_WALL = 1;
	const TRACK_PLAYER = 2;
	const TRACK_GOAL = 3;
	const TRACK_TREE = 4;
	const TRACK_FLAG = 5;

	function drawTracks(){
		var trackIndex = 0;
		var trackLeftEdgeX = 0;
		var trackTopEdgeY = 0;
		for(var eachRow = 0; eachRow < TRACK_ROWS; eachRow++){ // deal with one row at a time

			trackLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge

			for(var eachCol = 0; eachCol < TRACK_COLS; eachCol++){ // left to right in each row
				
				var trackTypeHere = trackGrid[trackIndex];  //getting the track code here
				canvasContext.drawImage(trackPics[trackTypeHere], trackLeftEdgeX, trackTopEdgeY);
				trackIndex++; //increment which index we're going to next check in the track
				trackLeftEdgeX += TRACK_W; // jump horizontal draw to next tile over by tile width
			}

			trackTopEdgeY += TRACK_H; // jump horizontal draw down by one tile height
		}

	}

	function getTrackAtPixelCoord(pixelX, pixelY){
		var tileCol = pixelX/TRACK_W;
		var tileRow = pixelY/TRACK_H;

		//round down to nearest whole number
		tileCol = Math.floor(tileCol);
		tileRow = Math.floor(tileRow);

		//first check whether the car is within any part of the track wall
		if(tileCol < 0 || tileCol >= TRACK_COLS || tileRow < 0 || tileRow >= TRACK_ROWS){
			return TRACK_WALL; // bail out of function to avoid illegal array position usage
		}

		var trackIndex = trackTileToIndex(tileCol, tileRow);
		return trackGrid[trackIndex];
		
	}

	//returns index for the trackGrid
	function trackTileToIndex(tileCol, tileRow){
		return(tileCol + TRACK_COLS*tileRow);
	}

	//check if there's a wall
	function isWallAtTileCoord(trackTileCol, trackTileRow){
		var trackIndex = trackTileCol + TRACK_COLS*trackTileRow;
		return (trackGrid[trackIndex] == TRACK_WALL);
	}