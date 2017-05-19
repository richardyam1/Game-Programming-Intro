var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 80;
const PADDLE_THICKNESS = 10;
const cpuSpeed = 11;

function moveComputerPaddle(){
	//if ball is below paddle center
	if (ballY > (paddle2Y + PADDLE_HEIGHT/2) + 35){
	    paddle2Y += cpuSpeed;
	}
	//if ball is above paddle center
	else if (ballY < (paddle2Y + PADDLE_HEIGHT/2 - 35)){
	    paddle2Y -= cpuSpeed;
	}
}

function paddleDraw(){
	drawBitmapCenteredAtLocation(player1Paddle, 0, paddle1Y);
	drawBitmapCenteredAtLocation(player2Paddle, canvas.width - PADDLE_THICKNESS, paddle2Y);
}
