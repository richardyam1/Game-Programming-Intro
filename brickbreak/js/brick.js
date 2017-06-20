const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const GREY_BRICK = 1;
var bricksLeft = 0;
var	brickGrid	=       	[	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
								0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
								0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
								1,	1,	1,	1,	1,	1,	1,	1,	1,	1
								];


function drawBricks(){
	for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++){
		for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
			if(isBrickAtTileCoord(eachCol, eachRow)){
				var brickLeftEdgeX = eachCol * BRICK_W;
				var brickTopEdgeY = eachRow * BRICK_H;
				drawBitmapPositionedByTopLeftCorner(brickPic, brickLeftEdgeX, brickTopEdgeY);
			}
		}
	}

}

function countBricks(){	
	for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++){
		for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
			if(isBrickAtTileCoord(eachCol, eachRow)){
				bricksLeft++;
			}
		}
	}
}



function resetBricks(){
	for(var i = BRICK_COLS * 3; i < BRICK_COLS * BRICK_ROWS; i++){
		brickGrid[i] = 1;
	}
}

function brickTileToIndex(tileCol, tileRow){
	return(tileCol + BRICK_COLS*tileRow);
}

function isBrickAtTileCoord(brickTileCol, brickTileRow){
	var brickIndex = brickTileCol + BRICK_COLS*brickTileRow;
	return (brickGrid[brickIndex] == 1);
}