var ballSpeedX = 1;
var ballSpeedY = 1;
var changeDirectionX = false;
var changeDirectionY = false;
var ballX = (paddleX + (PADDLE_WIDTH/2)) + 10;
var ballY = PADDLE_Y - 5;
var magnitude;
var normalVectorX;
var normalVectorY;
var ballPosition = [];
var ballTrailLength = 10;
var ballDistanceFromLeftPaddleEdge;
var ballActive = [];
var numBalls = 1;
var balls = [];


/*
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
							//Calculate distance of ball from left paddle edge is it stays there when paddle is moved
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
*/

function ballClass(x){
	this.x = (paddleX + (PADDLE_WIDTH/2)) + x;
	this.y = PADDLE_Y - 5;
	this.dx = 6;
	this.dy = 6;
	this.suspended = false;
	this.ballDistanceFromLeftPaddleEdge;
}

function createFirstBall(){
	balls[0] = new ballClass(5);
}
//createBalls();

function createExtraBalls(){
	if(numBalls > 1){
		for(var i = 1; i < numBalls; i++){
			balls[i] = new ballClass(5 + i);
			balls[i].dy = 4 * i;
		}

	}
	
}

/*
function ballDrawAndMove(){
	for(var j = 0; j < numBalls; j++){
		var ball = balls[j];
		//if(ballSuspended === true){
			//ball.x = paddleX + (PADDLE_WIDTH/2) + 10;
		//}
		
		if(ball.suspended === false){

			if(ball.x < 0 || ball.x > canvas.width){
				ball.dx *= -1;
				//ballSpeedX *= -1;
			}

			if(ball.y < 0){
				ball.dy *= -1;
				//ballSpeedY *= -1;
			}

			if(ball.dy > 0.0){
				if(ball.y >= PADDLE_Y && ball.y <= PADDLE_Y + PADDLE_HEIGHT){
					if(ball.x > paddleX && ball.x < paddleX + PADDLE_WIDTH){
						if(powerSticky === true){
							//ballSuspended = true;
							//Calculate distance of ball from left paddle edge is it stays there when paddle is moved
							//ball.x = ballX;
							ball.suspended = true;
							ballSuspended = true;
							ball.ballDistanceFromLeftPaddleEdge = ball.x - paddleX;
							ball.x = paddleX + ball.ballDistanceFromLeftPaddleEdge;

						}
					
						hitPaddleSound.play();
						ball.dy *= -1;
						//ballSpeedY *= -1;
						paddleHit += 1;
						var centerPaddle = paddleX + PADDLE_WIDTH/2;
						var centerDistance = ball.x - centerPaddle;
						ball.dx = centerDistance * 0.35;
						if(paddleHit % 10 === 0){
							ball.dy -= 3;
						}
						if(bricksLeft === 0){
							resetBricks();
							countBricks();
						}
						
					}
					
				}
				
				//if ball goes over bottom 
				if (ball.y > canvas.height){
					missSound.play();
					lives--;
					//remove ball from array
					balls.splice(j, 1);

					numBalls--;
					if(numBalls === 0){
						//delete balls[j];
						numBalls = 1;
						ballSuspended = true;
						createFirstBall();
					}
					powerSticky = false;
					//ballReset();
					//ballSuspended = true;
				}

				
			}
			
			//var changeDirection = breakAndBounceOffBrickAtPixelCoord(ball.x, ball.y);
			breakAndBounceOffBrickAtPixelCoord(ball.x, ball.y);
			if(changeDirectionX === true && changeDirectionY === false){
				ball.dx *= -1;
				changeDirectionX = false;
			}
			else if(changeDirectionX === false && changeDirectionY === true){
				ball.dy *= -1;
				changeDirectionY = false;
			}
			else if(changeDirectionX === true && changeDirectionY === true){
				ball.dx *= -1;
				ball.dy *= -1;
				changeDirectionX = false;
				changeDirectionY = false;
			}
			
			
			
			/*
			if(breakAndBounceOffBrickAtPixelCoord(ball.x, ball.y) === true){
				ball.dx *= ballSpeedX;
				ball.dy *= ballSpeedY;
			}
			ball.x += ball.dx;
			ball.y += ball.dy;
		}
		
		else if(ball.suspended === true){
			ball.x = paddleX + ball.ballDistanceFromLeftPaddleEdge;
		}
		//document.getElementById("debugText").innerHTML = ball.y + " " + PADDLE_Y + " " + (PADDLE_Y + PADDLE_HEIGHT);
		//document.getElementById("debugText").innerHTML = ball.x + " " + paddleX + " " + (paddleX + PADDLE_WIDTH);
		//document.getElementById("debugText").innerHTML = changeDirection;

		drawBitmapCenteredAtLocation(ballPic, ball.x, ball.y);
		//breakAndBounceOffBrickAtPixelCoord(ball.x, ball.y);
		
		storeLastPosition(ball.x, ball.y);
	}

}
*/

function ballDraw(){
	for(var l = 0; l < balls.length; l++ ){
		drawBitmapCenteredAtLocation(ballPic, balls[l].x, balls[l].y);
	}
					document.getElementById("debugText").innerHTML = bricksLeft;

}

function ballMove(){
	for(var j = 0; j < numBalls; j++){
		var ball = balls[j];
		//if(ballSuspended === true){
			//ball.x = paddleX + (PADDLE_WIDTH/2) + 10;
		//}
		
		if(ball.suspended === false){

			if(ball.x < 0 || ball.x > canvas.width){
				ball.dx *= -1;
				//ballSpeedX *= -1;
			}

			if(ball.y < 0){
				ball.dy *= -1;
				//ballSpeedY *= -1;
			}

			if(ball.dy > 0.0){
				if(ball.y >= PADDLE_Y && ball.y <= PADDLE_Y + PADDLE_HEIGHT){
					if(ball.x > paddleX && ball.x < paddleX + PADDLE_WIDTH){
						if(powerSticky === true){
							//ballSuspended = true;
							//Calculate distance of ball from left paddle edge is it stays there when paddle is moved
							//ball.x = ballX;
							ball.suspended = true;
							ballSuspended = true;
							ball.ballDistanceFromLeftPaddleEdge = ball.x - paddleX;
							ball.x = paddleX + ball.ballDistanceFromLeftPaddleEdge;

						}
					
						hitPaddleSound.play();
						ball.dy *= -1;
						//ballSpeedY *= -1;
						paddleHit += 1;
						var centerPaddle = paddleX + PADDLE_WIDTH/2;
						var centerDistance = ball.x - centerPaddle;
						ball.dx = centerDistance * 0.35;
						if(paddleHit % 10 === 0){
							ball.dy -= 3;
						}
						
						
					}
					
				}
				
				//if ball goes over bottom 
				if (ball.y > canvas.height){
					missSound.play();
					if(lives === 0){
						resetGame();
					}
					else{
						lives--;
					}
					//remove ball from array
					balls.splice(j, 1);

					numBalls--;
					if(numBalls === 0){
						//delete balls[j];
						numBalls = 1;
						ballSuspended = true;
						createFirstBall();
					}

					powerSticky = false;
					//ballReset();
					//ballSuspended = true;
				}

				
			}
			
			//var changeDirection = breakAndBounceOffBrickAtPixelCoord(ball.x, ball.y);
			breakAndBounceOffBrickAtPixelCoord(j);
			/*
			if(changeDirectionX === true && changeDirectionY === false){
				ball.dx *= -1;
				changeDirectionX = false;
			}
			else if(changeDirectionX === false && changeDirectionY === true){
				ball.dy *= -1;
				changeDirectionY = false;
			}
			else if(changeDirectionX === true && changeDirectionY === true){
				ball.dx *= -1;
				ball.dy *= -1;
				changeDirectionX = false;
				changeDirectionY = false;
			}*/
			
			
			
			/*
			if(breakAndBounceOffBrickAtPixelCoord(ball.x, ball.y) === true){
				ball.dx *= ballSpeedX;
				ball.dy *= ballSpeedY;
			}*/
			ball.x += ball.dx;
			ball.y += ball.dy;
		}
		
		else if(ball.suspended === true){
			ball.x = paddleX + ball.ballDistanceFromLeftPaddleEdge;
		}
		//document.getElementById("debugText").innerHTML = ball.y + " " + PADDLE_Y + " " + (PADDLE_Y + PADDLE_HEIGHT);
		//document.getElementById("debugText").innerHTML = ball.x + " " + paddleX + " " + (paddleX + PADDLE_WIDTH);
		//document.getElementById("debugText").innerHTML = changeDirection;

		//drawBitmapCenteredAtLocation(ballPic, ball.x, ball.y);
		//breakAndBounceOffBrickAtPixelCoord(ball.x, ball.y);
		
		storeLastPosition(ball.x, ball.y);
	}

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

function resetBall(){
	ballSuspended = true;
	powerFire = false;
	powerCannon = false;
	powerMulti = false;
	powerSticky = false;
	numBalls = 1;
	createFirstBall();
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




