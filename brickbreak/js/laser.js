var laserActive = [];


function createLaser(){
	var laser1 = new laserClass();
	laser1.laserInitX(25);
	laserActive.push(laser1);

	var laser2 = new laserClass();
	laser2.laserInitX(75)
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
			if(i.y < 0 || laserBreakBrick(this.x, this.y) === true){
				delete laserActive[i];
			}	
		}
	};


	this.laserDraw = function(){
		drawBitmapCenteredAtLocation(laserPic, this.x, this.y);		
		document.getElementById("debugText").innerHTML = laserBreakBrick(this.x, this.y);	
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
			}
			brickGrid[brickIndex] -= 1;
			return true;
		}
	}
}





/*
function laserClass(){
	//check if there's a laser in use.
	this.alive = false;

	//set value for laser
	this.spawn = function(x, y, speed){
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};

	this.laserDraw = function(){
		//this.laserY = PADDLE_Y - laserMoveAmount;
		if(laserShot === true){
			laserActive.push(new shotClass(paddleX + 25, PADDLE_Y - 10, dx, dy));
		}
		if(laserActive.length === 0){
			return;
		}

		var activeShot = [];

		for(var i = 0; i < laserActive.length; i++){
			var shot = laserActive[i];

			shot.x += shot.dx;
			shot.y += shot.dy;
			if(shot.y > 0){
				activeShot.push(shot);

				//drawBitmapCenteredAtLocation(laserPic, shot.x, shot.y);
			    //drawBitmapCenteredAtLocation(laserPic, shot.x + 50, shot.y);
			}
		}
		document.getElementById("debugText").innerHTML = activeShot[0].y;

		drawBitmapCenteredAtLocation(laserPic, activeShot[0].x, activeShot[0].y);
		if(activeShot[0].y < 0){
			activeShot.splice(0, 1);
		}

		
		for(var j = 0; j < activeShot.length; j++){
			drawBitmapCenteredAtLocation(laserPic, activeShot[j].x, activeShot[j].y);
			drawBitmapCenteredAtLocation(laserPic, activeShot[j].x + 50, activeShot[j].y);
		}
		//Set max length for active shot.  Pop shot that goes off screen.



		if(activeShot.length < laserActive.length){
			laserActive.length = 0;
			Array.prototype.push.apply(laserActive, activeShot);
		}
	
	};

	this.laserMove = function(){
		if(this.laserY <= 0){
			laserMoveAmount = 5;
			laserShot = false;
		}
		else{
			laserMoveAmount += 5;	
		}
		//laserBreakBrick(laserLeftX, this.laserY);
		//laserBreakBrick(laserRightX, this.laserY);
	};

	this.laserReset = function(){
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
	};
}
*/