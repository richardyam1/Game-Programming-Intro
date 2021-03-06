const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_Y = 540;
var paddleX = 350;

function paddleDraw(){
	//Turns paddle green to signify that powerSticky is active
	if(powerSticky === true){
		drawBitmapPositionedByTopLeftCorner(paddleStickyPic, paddleX, PADDLE_Y);
	}
	else{
		drawBitmapPositionedByTopLeftCorner(paddlePic, paddleX, PADDLE_Y);
	}
}

//Draws the cannons
function cannonDraw(){
	drawBitmapCenteredAtLocation(cannonPic, paddleX + 25, PADDLE_Y - 10);
	drawBitmapCenteredAtLocation(cannonPic, paddleX + 75, PADDLE_Y - 10);
}

