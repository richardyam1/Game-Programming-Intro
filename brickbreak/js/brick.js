const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;

var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
var bricksLeft = BRICK_COLS * (BRICK_ROWS - 3);

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