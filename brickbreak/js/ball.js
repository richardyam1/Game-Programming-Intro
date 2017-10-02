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
var ballSuspendedAmount;

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

function createExtraBalls(){
	if(numBalls > 1){
		for(var i = 1; i < numBalls; i++){
			balls[i] = new ballClass(5 + i);
			balls[i].dy = 4 * i;
		}

	}
	
}


function ballDraw(){
	for(var l = 0; l < balls.length; l++ ){
		drawBitmapCenteredAtLocation(ballPic, balls[l].x, balls[l].y);
	}

}

function ballMove(){
	for(var j = 0; j < numBalls; j++){
		var ball = balls[j];	
		if(ball.suspended === false){

			if(ball.x < 0 || ball.x > canvas.width){
				ball.dx *= -1;
				
			}

			if(ball.y < 0){
				ball.dy *= -1;
				
			}

			if(ball.dy > 0.0){
				if(ball.y >= PADDLE_Y && ball.y <= PADDLE_Y + PADDLE_HEIGHT){
					if(ball.x > paddleX && ball.x < paddleX + PADDLE_WIDTH){
						if(powerSticky === true && ballSuspendedAmount > 0){
							
							ball.suspended = true;
							ballSuspended = true;
							ballSuspendedAmount--;
							if(ballSuspendedAmount === 0){
								powerSticky = false;
							}
							ball.ballDistanceFromLeftPaddleEdge = ball.x - paddleX;
							ball.x = paddleX + ball.ballDistanceFromLeftPaddleEdge;

						}
					
						hitPaddleSound.play();
						ball.dy *= -1;
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
						numBalls = 1;
						ballSuspended = true;
						createFirstBall();
					}

					powerSticky = false;
					
				}

				
			}
			
			breakAndBounceOffBrickAtPixelCoord(j);
			ball.x += ball.dx;
			ball.y += ball.dy;
		}
		
		else if(ball.suspended === true){
			ball.x = paddleX + ball.ballDistanceFromLeftPaddleEdge;
		}
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




