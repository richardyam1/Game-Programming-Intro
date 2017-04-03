	const TILE_W = 50;
	const TILE_H = 50;
	const ROOM_COLS = 16;
	const ROOM_ROWS = 12;


	var	roomGrid	=      [	4,	4,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
								4,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
								1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
								1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,
								1,	0,	0,	0,	1,	1,	1,	4,	4,	4,	4,	1,	1,	1,	0,	1,
								1,	0,	0,	1,	1,	0,	0,	1,	4,	4,	1,	1,	0,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	0,	0,	1,	4,	1,	0,	0,	0,	0,	1,
								1,	0,	0,	1,	0,	0,	0,	0,	0,	1,	1,	0,	0,	0,	0,	1,
								1,	2,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	5,	0,	1,
								1,	0,	0,	1,	0,	0,	5,	0,	0,	0,	5,	0,	0,	1,	0,	1,
								1,	1,	1,	1,	3,	3,	1,	1,	0,	0,	0,	0,	0,	1,	0,	1,	////	added	3’s
								1,	1,	5,	1,	1,	1,	1,	4,	4,	4,	4,	4,	4,	1,	1,	1];
	const TILE_GROUND = 0;
	const TILE_WALL = 1;
	const TILE_PLAYER = 2;
	const TILE_GOAL = 3;
	const TILE_KEY = 4;
	const TILE_DOOR = 5;

	function drawRoom(){
		var tileIndex = 0;
		var tileLeftEdgeX = 0;
		var tileTopEdgeY = 0;
		for(var eachRow = 0; eachRow < ROOM_ROWS; eachRow++){ // deal with one row at a time

			tileLeftEdgeX = 0; // resetting horizontal draw position for tiles to left edge

			for(var eachCol = 0; eachCol < ROOM_COLS; eachCol++){ // left to right in each row
				
				var tileTypeHere = roomGrid[tileIndex];  //getting the track code here
				canvasContext.drawImage(tilePics[tileTypeHere], tileLeftEdgeX, tileTopEdgeY);
				tileIndex++; //increment which index we're going to next check in the track
				tileLeftEdgeX += TILE_W; // jump horizontal draw to next tile over by tile width
			}

			tileTopEdgeY += TILE_H; // jump horizontal draw down by one tile height
		}

	}

	function getTileAtPixelCoord(pixelX, pixelY){
		var tileCol = pixelX/TILE_W;
		var tileRow = pixelY/TILE_H;

		//round down to nearest whole number
		tileCol = Math.floor(tileCol);
		tileRow = Math.floor(tileRow);

		//first check whether the car is within any part of the track wall
		if(tileCol < 0 || tileCol >= ROOM_COLS || tileRow < 0 || tileRow >= ROOM_ROWS){
			return TILE_WALL; // bail out of function to avoid illegal array position usage
		}

		var tileIndex = roomTileToIndex(tileCol, tileRow);
		return roomGrid[tileIndex];
		
	}

	function roomTileToIndex(tileCol, tileRow){
		return(tileCol + ROOM_COLS*tileRow);
	}

	
	function isWallAtTileCoord(trackTileCol, trackTileRow){
		var tileIndex = trackTileCol + ROOM_COLS*trackTileRow;
		return (tileGrid[tileIndex] == TILE_WALL);
	}