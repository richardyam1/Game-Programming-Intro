var ballSpeedX = 6;
var ballSpeedY = 6;
var ballX = (paddleX + (PADDLE_WIDTH/2)) + 10;
var ballY = PADDLE_Y - 5;
var magnitude;
var normalVectorX;
var normalVectorY;
var ballPosition = [];
var ballTrailLength = 10;
var ballDistanceFromLeftPaddleEdge;

function ballMove(){
	if(ballSuspended === false){
		//bounce ball off wall
		if((ballX > canvas.width && ballSpeedX > 0) || (ballX < 0 && ballSpeedX < 0)){
			ballSpeedX *= -1;
		}

		//if ball hits paddle while moving downwards
		if(ballSpeedY > 0.0){
			if(ballY >= PADDLE_Y && ballY <= PADDLE_Y + PADDLE_HEIGHT){
				if(ballX > paddleX && ballX < paddleX + PADDLE_WIDTH){
					if(powerSticky === true){
						ballSuspended = true;
						ballDistanceFromLeftPaddleEdge = ballX - paddleX;
					}
				
					hitPaddleSound.play();
					ballSpeedY *= -1;
					paddleHit += 1;
					var centerPaddle = paddleX + PADDLE_WIDTH/2;
					var centerDistance = ballX - centerPaddle;
					ballSpeedX = centerDistance * 0.35;
					if(paddleHit % 10 === 0){
						ballSpeedY -= 3;
					}
					if(bricksLeft === 0){
						resetBricks();
						countBricks();
					}
					
				}
				
			}
		}

		//if ball goes over bottom 
		if (ballY > canvas.height){
			missSound.play();
			ballReset();
			ballSuspended = true;
		}
		//if ball goes over ceiling
		else if(ballY < 0){
			ballSpeedY *= -1;
		}

		
		//moves ball horizontally
		ballX += ballSpeedX;

		//moves ball vertically
		ballY += ballSpeedY;


		breakAndBounceOffBrickAtPixelCoord(ballX, ballY);
		storeLastPosition(ballX, ballY);		
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
	powerSticky = false;
}

function ballDraw(){
	drawBitmapCenteredAtLocation(ballPic, ballX, ballY);
}

function storeLastPosition(xPos, yPos){
    ballPosition.push({
        x: xPos,
        y: yPos
    });
    //removes left most element in array
    if(ballPosition.length > ballTrailLength){
        ballPosition.shift();
    }
}

function trailDraw(){
    //draws out trail behind the ball that gets smaller
    for(var i = 0; i < ballPosition.length; i++){
        var ratio = (i + 1)/ ballPosition.length;
        canvasContext.beginPath();
        //draw circle that gets smaller behind ball to produce trailing effect
        canvasContext.arc(ballPosition[i].x, ballPosition[i].y, ballPic.width/((ballPosition.length-i) + 2), 0, 2 * Math.PI, true);
        canvasContext.fillStyle = "rgba(204, 102, 153, " + ratio / 2 + ")";
        canvasContext.fill();
    }
}

