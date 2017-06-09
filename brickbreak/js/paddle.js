const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_Y = 540;
var paddleX = 350;

function paddleDraw(){
	drawBitmapPositionedByTopLeftCorner(paddlePic, paddleX, PADDLE_Y)
}