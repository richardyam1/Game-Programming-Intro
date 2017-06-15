var ballSpeedX = 6;
var ballSpeedY = 6;
var ballX = (paddleX + (PADDLE_WIDTH/2)) + 10;
var ballY = PADDLE_Y - 5;
var magnitude;
var normalVectorX;
var normalVectorY;
function ballMove(){
	if(ballSuspended === false){
		//bounce ball off wall
		if((ballX > canvas.width && ballSpeedX > 0) || (ballX < 0 && ballSpeedX < 0)){
			ballSpeedX *= -1;
		}

		//if ball hits paddle while moving downwards
		if(ballSpeedY > 0.0){
			if(ballY >= PADDLE_Y && ballY <= PADDLE_Y + PADDLE_HEIGHT){
				if(ballX > paddleX && ballX < paddleX+PADDLE_WIDTH){
					ballSpeedY *= -1;
					paddleHit += 1;
					var centerPaddle = paddleX + PADDLE_WIDTH/2;
					var centerDistance = ballX - centerPaddle;
					ballSpeedX = centerDistance * 0.35; 
					if(paddleHit % 10 === 0){
						ballSpeedY -= 3;
					}
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
			ballSuspended = true;
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
}

function ballReset(){
	ballX = (paddleX + (PADDLE_WIDTH/2)) + 10;
	ballY = PADDLE_Y - 10;
	if(lives === 0){
		resetGame();
	}
	else{
		lives--;
	}
	ballSpeedY = 6;
	paddleHit = 0;
}

function ballDraw(){
	drawBitmapCenteredAtLocation(ballPic, ballX, ballY);
}

