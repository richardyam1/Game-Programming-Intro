var canvas;
var canvasContext;
var scoreBoard;
var scoreBoardContext;
var score = 0;
var finalScore;
var lives = 2;
var ballSuspended= true;
var showTitleScreen = true;
var paddleHit = 0;
var extraLifeScore = 4000;
var extraLifeCounter = 3;
var extraLifeGained = false;
var powerFire = false;
var powerCannon = false;
var powerMulti = false;
var powerSticky = false;

var backgroundMusic = new BackgroundMusicClass();
var hitPaddleSound = new SoundOverlapsClass("audio/paddleHit");
var hitBrickSound = new SoundOverlapsClass("audio/brickHit");
var missSound = new SoundOverlapsClass("audio/miss");
var extraLifeSound = new SoundOverlapsClass("audio/extraLife");




$(document).ready(function(){
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	scoreBoard = document.getElementById("scoreCanvas");
	scoreBoardContext = scoreBoard.getContext("2d");
	loadImages();
	canvasContext.textAlign = "center";
	countBricks();
	//resetBricks();
});

function loadingDoneSoStartGame(){
        var framesPerSecond = 30;
        setInterval(function(){
            drawEverything();
            moveEverything();
        }, 1000/framesPerSecond);
        initInput();
 }


function drawEverything(){
	document.getElementById("debugText").innerHTML = paddleX + "     " + ballX;
	//game board
    canvasContext.drawImage(backgroundPic, 0, 0);
    //draw score board
    colorRectScore(0, 0, scoreBoard.width, scoreBoard.height, "grey");
    colorTextScore(score, 100, 100, "white");
    if(extraLifeGained === true){
    	colorText("Extra Life!", canvas.width/2, canvas.height/2 + 100, "white");
    	setTimeout(function(){extraLifeGained = false}, 1000);
    }
	drawBricks();

	//paddle
	paddleDraw();

	//draw ball
	ballDraw();	

	drawLives();
	
	if(powerFire === true){
		trailDraw();
		setTimeout(function(){powerFire= false}, 1000);
	}

	if(showTitleScreen === true){
		colorRect(0, 0, canvas.width, canvas.height, "black");
		colorText("Brick Breaker", canvas.width/2, 200, "white");
		colorText("Click to start the game", canvas.width/2, 250, "white");
		if(finalScore > 0){
			colorText("Your Final Score: " + finalScore, canvas.width/2, 300, "white");
		}
	}
	
}

function moveEverything(){
	ballMove();		

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
	if(powerFire === true){
		hitBrickSound.play();
		brickGrid[brickIndex] = 0;
	}
	if(brickGrid[brickIndex] > 0 && powerFire === false){
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

		//must come in vertically
		if(prevTileRow != tileRow){
			var adjacentBrickIndex = brickTileToIndex(tileCol, prevTileRow);
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
		
		hitBrickSound.play();
		if(brickGrid[brickIndex] === 1 || brickGrid[brickIndex] === 2 || brickGrid[brickIndex] === 3){
			if(brickGrid[brickIndex] === 1){
				bricksLeft--;
				score += (100 * (BRICK_ROWS - tileRow));
				if(score >= extraLifeScore && extraLifeCounter > 0){
					extraLifeSound.play();
					lives++;
					extraLifeScore += (extraLifeScore + (extraLifeScore * 0.5));
					extraLifeCounter--;
					extraLifeGained = true;
				}
			}
			brickGrid[brickIndex] -= 1;

			
		}
	}
	
}

function resetGame(){
	finalScore = score;
	score = 0;
	lives = 2;
	ballSuspended= true;
	showTitleScreen = true;
	resetBricks();
}


function drawLives(){
	for(var i = 0; i < lives; i++){
		scoreBoardContext.drawImage(lifePic, 5 + (40 * i), 300);
	}
}


/*

Cannon:
Have image of cannon/gun appear above paddle
Clicking will shoot lasers


Multiball:
Create var for each of the 2 new balls
Create var for amount of balls
Lose life only if ball = 0
Create function to draw extra balls

Sticky Ball:
Have ball stick to paddle on contact.  Ball get's released upon click
Make ballSuspended = true when powerSticky = true && when ball contacts paddle
*/





	

	
