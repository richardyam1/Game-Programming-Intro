var laserActive = [];

function createLaser(){
	var laser1 = new laserClass();
	laser1.laserInitX(25);
	laserActive.push(laser1);

	var laser2 = new laserClass();
	laser2.laserInitX(75);
	laserActive.push(laser2);
}

function laserClass(){
	//check if there's a laser in use.
	this.active = true;
	this.y = (PADDLE_Y - 10);
	this.ySpeed = 7;

	this.laserMove = function(){
		this.y -= this.ySpeed;
		for(var i in laserActive){
			if(laserBreakBrick(this.x, this.y) === true){
				delete laserActive[i];
			}
		}
	};


	this.laserDraw = function(){
		drawBitmapCenteredAtLocation(laserPic, this.x, this.y);		
		//document.getElementById("debugText").innerHTML 	
	};

	this.laserInitX = function(x){
		this.x = paddleX + x;
	}

	
}


//removes the laser from array when it leaves the screen
for(var i in laserActive){
	if(i.y < 0){
		delete laserActive[i];
	}
	
}



function laserBreakBrick(pixelX, pixelY){
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
	
	if(brickGrid[brickIndex] > 0){
		//Checks the previous col or row of the ball
		

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


