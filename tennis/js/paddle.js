var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
//Make thickness greater than ball possible maximum speed to prevent ball from passing through paddle
const PADDLE_THICKNESS = MAX_BALL_SPEED + 2;
const DIST_FROM_EDGE = 120;
const CPU_SPEED = 11;
const PLAYER_SPEED = 11;

function moveComputerPaddle(){
	//if ball is below paddle center
	if (ballY > (paddle2Y + PADDLE_HEIGHT/2) + 35){
	    paddle2Y += CPU_SPEED;
	}
	//if ball is above paddle center
	else if (ballY < (paddle2Y + PADDLE_HEIGHT/2 - 35)){
	    paddle2Y -= CPU_SPEED;
	}
}

function movePlayerPaddle(){
	if(wKeyPressed === true){
		paddle1Y -= PLAYER_SPEED;
		if(paddle1Y < 0){
			paddle1Y = 0;
		}
	}
	if(sKeyPressed === true){
		paddle1Y += PLAYER_SPEED;
		if(paddle1Y + player1Paddle.height > canvas.height){
			paddle1Y = canvas.height - player1Paddle.height;
		}
	}
	if(upKeyPressed === true){
		paddle2Y -= PLAYER_SPEED;
		if(paddle2Y < 0){
			paddle2Y = 0;
		}
	}

	if(downKeyPressed === true){
		paddle2Y += PLAYER_SPEED;
		if(paddle2Y + player2Paddle.height > canvas.height){
			paddle2Y = canvas.height - player2Paddle.height;
		}
	}
}



function paddleDraw(){
	drawBitmapPositionedByTopLeftCorner(player1Paddle, DIST_FROM_EDGE, paddle1Y);
	drawBitmapPositionedByTopLeftCorner(player2Paddle, canvas.width - player2Paddle.width - DIST_FROM_EDGE, paddle2Y);
}
