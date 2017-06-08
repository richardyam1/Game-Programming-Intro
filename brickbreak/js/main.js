var canvas;
var convasContext;

$(document).ready(function(){
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	resetBricks();
});

function loadingDoneSoStartGame(){
        var framesPerSecond = 30;
        setInterval(function(){
            drawEverything();
            moveEverything();
        }, 1000/framesPerSecond);
        initInput();
 }


function drawEverything(){
	//game board
	colorRect(0, 0, canvas.width, canvas.height, "black");

	drawBricks();

	//paddle
	colorRect(paddleX, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

	//draw ball
	colorCircle(ballX, ballY, 10, "white");	
}


function breakAndBounceOffBrickAtPixelCoord(pixelX, pixelY){
	var tileCol = pixelX/BRICK_W;
	var tileRow = pixelY/BRICK_H;

	//round down to nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	//first check whether the ball is within any part of the brick wall
	if(tileCol < 0 || tileCol >= BRICK_COLS || tileRow < 0 || tileRow >= BRICK_ROWS){
		return false; // bail out of function to avoid illegal array position usage
	}

	var brickIndex = brickTileToIndex(tileCol, tileRow);

	if(brickGrid[brickIndex] === 1){
		//Checks the previous col or row of the ball
		var prevBallX = ballX - ballSpeedX;
		var prevBallY = ballY - ballSpeedY;
		var prevTileCol = Math.floor(prevBallX / BRICK_W);
		var prevTileRow = Math.floor(prevBallY / BRICK_H);

		var bothTestsFailed = true;

		//must come in horizontally
		if(prevTileCol != tileCol){
			var adjacentBrickIndex = brickTileToIndex(prevTileCol, tileRow);
			//make sure the side we want to reflect off isn't blocked
			if(brickGrid[adjacentBrickIndex] != 1){
				ballSpeedX *= -1;
				bothTestsFailed = false;
			}
		}

		//must come in vertically
		if(prevTileRow != tileRow){
			var adjacentBrickIndex = brickTileToIndex(tileCol, prevTileRow);
			//make sure the side we want to reflect off isn't blocked
			if(brickGrid[adjacentBrickIndex] != 1){
				ballSpeedY *= -1;
				bothTestsFailed = false;
			}
		}

		// we hit an "armpit" on the inside corner, flip both to avoid going into it
		if(bothTestsFailed){
			ballSpeedX *= -1;
			ballSpeedY *= -1;
		}

		brickGrid[brickIndex] = 0;
		bricksLeft--;
		console.log(bricksLeft);
	}

	
}



	

	
