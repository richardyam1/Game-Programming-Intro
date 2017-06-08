var ballSpeedX = 6;
var ballSpeedY = 6;
var ballX = 400;
var ballY = 450;

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
				if(bricksLeft === 0){
					bricksLeft = (BRICK_COLS * (BRICK_ROWS - 3));
					resetBricks();
				}
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

function ballReset(){
	ballX = canvas.width/2;
	ballY = canvas.height - 250;
}