$(document).ready(function(){
	
	var ballSpeedX = 6;
	var ballSpeedY = 6;
	var framesPerSecond = 30;
	var paddleX = 350;
	var canvas;
	var convasContext;
	const PADDLE_WIDTH = 100;
	const PADDLE_HEIGHT = 10;
	const PADDLE_Y = 540;
	const BRICK_W = 80;
	const BRICK_H = 20;
	const BRICK_GAP = 2;
	const BRICK_COLS = 10;
	const BRICK_ROWS = 14;
	var brickGrid = new Array(BRICK_COLS * BRICK_ROWS);
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	var ballX = canvas.width/2;
	var ballY = canvas.height - 250;
	setInterval(function(){
		drawEverything(); 
		moveEverything();
    }, 1000/framesPerSecond);

	resetBricks();
	
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

		drawBricks();

		//paddle
		colorRect(paddleX, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

		//draw ball
		colorCircle(ballX, ballY, 10, "white");	
	}

	function drawBricks(){
		for(var eachCol = 0; eachCol < BRICK_COLS; eachCol++){
			for(var eachRow = 0; eachRow < BRICK_ROWS; eachRow++){
				if(isBrickAtTileCoord(eachCol, eachRow)){
					var brickLeftEdgeX = eachCol * BRICK_W;
					var brickTopEdgeY = eachRow * BRICK_H;
					colorRect(brickLeftEdgeX, brickTopEdgeY, BRICK_W - BRICK_GAP, BRICK_H - BRICK_GAP, "blue");
				}
			}
		}

	}

	function moveEverything(){
		//bounce ball off wall
		if(ballX > canvas.width || ballX < 0){
			ballSpeedX *= -1;
		}

		//if ball hits paddle while moving downwards
		if(ballSpeedY > 0.0){
			if(ballY >= PADDLE_Y && ballY <= PADDLE_Y + PADDLE_HEIGHT){
				if(ballX > paddleX && ballX < paddleX+PADDLE_WIDTH){
					ballSpeedY *= -1;
					var centerPaddle = paddleX + PADDLE_WIDTH/2;
					var centerDistance = ballX - centerPaddle;
					ballSpeedX = centerDistance * 0.35; 
				}
				
			}
		}

		//if ball goes over bottom 
		if (ballY > canvas.height){
			ballReset();
		}

		else if(ballY < 0){
			ballSpeedY *= -1;
		}

		//moves ball horizontally
		ballX += ballSpeedX;

		//moves ball vertically
		ballY += ballSpeedY;

		breakAndBounceOffBrickAtPixelCoord(ballX, ballY);
			
		
	}

	

	function resetBricks(){
		for(var i = 0; i < BRICK_COLS * BRICK_ROWS; i++){
			brickGrid[i] = 1;
		}
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

			if(prevTileRow != tileRow){
				var adjacentBrickIndex = brickTileToIndex(tileCol, prevtileRow);
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
		}

		
	}

	function brickTileToIndex(tileCol, tileRow){
		return(tileCol + BRICK_COLS*tileRow);
	}

	function isBrickAtTileCoord(brickTileCol, brickTileRow){
		var brickIndex = brickTileCol + BRICK_COLS*brickTileRow;
		return (brickGrid[brickIndex] == 1);
	}

	function ballReset(){
		ballX = canvas.width/2;
		ballY = canvas.height - 250;
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

	$(canvas).mousemove(function(evt){
		var mousePos = calculateMousePos(evt);
		paddleX = mousePos.x - (PADDLE_WIDTH/2);
	});
});
