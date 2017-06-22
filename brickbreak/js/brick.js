const BRICK_W = 80;
const BRICK_H = 20;
const BRICK_GAP = 2;
const BRICK_COLS = 10;
const BRICK_ROWS = 14;
const GREY_BRICK = 1;
const GREEN_BRICK = 2;
const RED_BRICK = 3;
const YELLOW_BRICK = 4;
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
								3,	3,	3,	3,	3,	3,	3,	3,	3,	3,
								];


function drawBricks(){
	for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++){
		for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
			if(isBrickAtTileCoord(eachCol, eachRow) === GREY_BRICK){
				setBrickType(greyBrickPic, eachCol, eachRow);
			}
			else if(isBrickAtTileCoord(eachCol, eachRow) === GREEN_BRICK){
				setBrickType(greenBrickPic, eachCol, eachRow);
			}
			else if(isBrickAtTileCoord(eachCol, eachRow) === RED_BRICK){
				setBrickType(redBrickPic, eachCol, eachRow);
			}
			else if(isBrickAtTileCoord(eachCol, eachRow) === YELLOW_BRICK){
				setBrickType(yellowBrickPic, eachCol, eachRow);
			}
		}
	}
	document.getElementById("debugText").innerHTML = bricksLeft;
}

function countBricks(){
	for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++){
		for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
			if(isBrickAtTileCoord(eachCol, eachRow) && isBrickAtTileCoord(eachCol, eachRow) !== 4){
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
	var brickType = brickGrid[brickIndex];
	return brickType;
}

function setBrickType(brick, col, row){
	var brickLeftEdgeX = col * BRICK_W;
	var brickTopEdgeY = row * BRICK_H;
	drawBitmapPositionedByTopLeftCorner(brick, brickLeftEdgeX, brickTopEdgeY)
}