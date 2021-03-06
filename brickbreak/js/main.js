var canvas;
var canvasContext;
var scoreBoard;
var scoreBoardContext;
var score = 0;
var finalScore;
var lives = 2;
var ballSuspended= true;
var showTitleScreen = true;
var gameClear = false;
var paddleHit = 0;
var extraLifeScore = 4000;
var extraLifeCounter = 3;
var extraLifeGained = false;
var backgroundMusic = new BackgroundMusicClass();
var hitPaddleSound = new SoundOverlapsClass("audio/paddleHit");
var hitBrickSound = new SoundOverlapsClass("audio/brickHit");
var missSound = new SoundOverlapsClass("audio/miss");
var extraLifeSound = new SoundOverlapsClass("audio/extraLife");
var powerGet = new SoundOverlapsClass("audio/powerGet");
var laserShoot = new SoundOverlapsClass("audio/laser");
var laser1 = new laserClass();
var laser2 = new laserClass();
var currentBallAmount = 0;


$(document).ready(function(){
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	scoreBoard = document.getElementById("scoreCanvas");
	scoreBoardContext = scoreBoard.getContext("2d");
	loadImages();
	canvasContext.textAlign = "center";
	powerReset();
	setPowers();
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
    drawPower();

	paddleDraw();
	
	
	if(ballSuspended === true && powerSticky === false){
		createFirstBall();
	}
	ballDraw();
	drawLives();
	
	if(powerFire === true){
		trailDraw();
		setTimeout(function(){powerFire= false}, 5000);
	}

	if(powerCannon === true){
		cannonDraw();
		colorText(laserAmmo, paddleX + PADDLE_WIDTH, PADDLE_Y - 50, "blue");
	}

	if(laserAmmo === 0){
		powerCannon = false;
	}


	if(showTitleScreen === true){
		colorRect(0, 0, canvas.width, canvas.height, "black");
		colorText("Brick Breaker", canvas.width/2, 200, "white");
		colorText("Click to start the game", canvas.width/2, 250, "white");
		if(finalScore > 0){
			colorText("Your Final Score: " + finalScore, canvas.width/2, 300, "white");
		}
		if(gameClear === true){
			colorText("Congratulation!  You've have cleared all the levels", canvas.width/2, 350, "white");
		}
	}
	//goes through laserActive array and draws the laser if it has not left the screen
	laserActive.forEach(function(laser1){
			if(laser1.y < 0){
				laser1.active = false;
			}
			laserActive = laserActive.filter(function(laser1){
				return laser1.active;
			});
					

			laser1.laserDraw();
			laser1.laserMove();

	});		
	
}

function moveEverything(){
	ballMove();
	
	movePower();
}
function breakAndBounceOffBrickAtPixelCoord(index){
	var tileCol = balls[index].x/BRICK_W;
	var tileRow = balls[index].y/BRICK_H;

	//round down to nearest whole number
	tileCol = Math.floor(tileCol);
	tileRow = Math.floor(tileRow);

	//first check whether the ball is within any part of the brick wall
	if(tileCol < 0 || tileCol >= BRICK_COLS || tileRow < 0 || tileRow >= BRICK_ROWS){
		return false; // bail out of function to avoid illegal array position usage
	}

	var brickIndex = brickTileToIndex(tileCol, tileRow);
	if(brickGrid[brickIndex] > 0 && powerFire === true){
		hitBrickSound.play();
		bricksLeft--;
		brickGrid[brickIndex] = 0;
	}
	if(brickGrid[brickIndex] > 0 && powerFire === false){
		//Checks the previous col or row of the ball
		var prevBallX = balls[index].x - balls[index].dx;
		var prevBallY = balls[index].y - balls[index].dy;
		var prevTileCol = Math.floor(prevBallX / BRICK_W);
		var prevTileRow = Math.floor(prevBallY / BRICK_H);

		var bothTestsFailed = true;
		
		
		//must come in horizontally
		if(prevTileCol != tileCol){
			var adjacentBrickIndex = brickTileToIndex(prevTileCol, tileRow);
			//make sure the side we want to reflect off isn't blocked
			if(brickGrid[adjacentBrickIndex] != 1){
				balls[index].dx *= -1;
				bothTestsFailed = false;
			}
		}

		//must come in vertically
		if(prevTileRow != tileRow){
			var adjacentBrickIndex = brickTileToIndex(tileCol, prevTileRow);
			//make sure the side we want to reflect off isn't blocked
			if(brickGrid[adjacentBrickIndex] != 1){
				balls[index].dy *= -1;
				bothTestsFailed = false;
			}
		}

		// we hit an "armpit" on the inside corner, flip both to avoid going into it
		if(bothTestsFailed){
			balls[index].dx *= -1;
			balls[index].dy *= -1;
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
				createPowerAtPixelCoord(tileCol, tileRow);
			}
			brickGrid[brickIndex] -= 1;
			return true;
			
		}
	}
	
}

function resetGame(){
	finalScore = score;
	score = 0;
	lives = 2;
	stageNumber = 1;
	ballSuspended = true;
	showTitleScreen = true;
	resetBricks();
	countBricks();
}


function drawLives(){
	for(var i = 0; i < lives; i++){
		scoreBoardContext.drawImage(lifePic, 5 + (40 * i), 300);
	}
}










	

	
