var activePowers = [];
var currentPowerAmount = 0;
var powerCapsuleLimit;
var powerFire = false;
var powerCannon = false;
var powerMulti = false;
var powerSticky = false;
var powerGrid;
const FIRE= 1;
const CANNON = 2;
const MULTI = 3;
const STICKY = 4;
const POINTS = 5;
const POWER_COLS = 10;
const POWER_ROWS = 14;
const POWER_W = 50;
const POWER_H = 28;

function powerReset(){
	//Copy brickGrid 
	powerGrid = brickGrid.slice();

	//Set every power index to 0
	for(var i = 0; i < powerGrid.length; i++){
		powerGrid[i] = 0;
	}

	//If there's a brick, give it a 1/3 chance of having a power-up and then assign a random number to the index.
	for(var j = 0; j < brickGrid.length; j++){
		if(brickGrid[j] > 0){
			if(Math.round(Math.random() * 2) === 0){
				powerGrid[j] = Math.round(Math.random() * 5);
			}
		}
	}
}

function powerClass(col, row){
	this.x = col * BRICK_W + 35;
	this.y = row * BRICK_H + 10;
	this.col = Math.floor(col);
	this.row = Math.floor(row);
	this.dy = 6;
	this.powerType;
	this.powerTypePic;
	this.active = false;
}

//Goes through powerGrid and assigns a power based on the number in the index
function setPowers(){
	for(var eachCol = 0; eachCol < POWER_COLS; eachCol++){
		for(var eachRow = 0; eachRow < POWER_ROWS; eachRow++){
			if(isPowerAtTileCoord(eachCol, eachRow) > 0){
				var power = new powerClass(eachCol, eachRow);
				
				if(isPowerAtTileCoord(eachCol, eachRow) === FIRE){
					power.powerType = FIRE;
					power.powerTypePic = powerFirePic;
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === CANNON){
					power.powerType = CANNON;
					power.powerTypePic = powerCannonPic;
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === MULTI){
					power.powerType = MULTI;
					power.powerTypePic = powerMultiPic;
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === STICKY){
					power.powerType = STICKY;
					power.powerTypePic = powerStickyPic;
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === POINTS){
					power.powerType = POINTS;
					power.powerTypePic = powerPointsPic;
				}

				activePowers.push(power);
				
			}
		}
	}
}

//Draws the power
function drawPower(){
	for(var i = 0; i < activePowers.length; i++){
		if(activePowers[i].active === true){
			setPowerType(activePowers[i].powerTypePic, activePowers[i].x, activePowers[i].y);
		}
	}
}


//When ball hits the brick the power resides in, the power becomes active
function makeActive(col, row){
	for(var j = 0; j < activePowers.length; j++){
		if(activePowers[j].col === col && activePowers[j].row === row){
			activePowers[j].active = true;
		}
		if(activePowers[j].powerType === MULTI && powerMulti === true){
			activePowers[j].active = false;
		}
		
	}
}

//Moves the power if it's active.  Activates power if it contacts the paddle
function movePower(){
	for(var k = 0; k < activePowers.length; k++){
		if(activePowers[k].active === true){
			activePowers[k].y += 5;
			if(activePowers[k].y >= PADDLE_Y && activePowers[k].y <= PADDLE_Y + PADDLE_HEIGHT){
				if(activePowers[k].x > paddleX && activePowers[k].x < paddleX + PADDLE_WIDTH){
					powerGet.play();
					if(activePowers[k].powerType === FIRE){
						powerFire = true;
					}
					else if(activePowers[k].powerType === CANNON){
						powerCannon = true;
						laserAmmo = 10;
					}
					else if(activePowers[k].powerType === MULTI){
						numBalls = 3;
        				createExtraBalls();
        				powerMulti = true;
					}
					else if(activePowers[k].powerType === STICKY){
						powerSticky = true;
						ballSuspendedAmount = 3;
					}
					else if(activePowers[k].powerType === POINTS){
						score += 1000;
					}
					//Removes power from array when it contacts the paddle so it will not be drawn anymore.
					activePowers.splice(k, 1);
				}
			}
		}
	}
}


function createPowerAtPixelCoord(powerCol, powerRow){
	var powerIndex = brickTileToIndex(powerCol, powerRow);
	if(powerGrid[powerIndex] > 0){
		makeActive(powerCol, powerRow);
	}	
}

//Checks if there's power in the brick
function isPowerAtTileCoord(powerTileCol, powerTileRow){
	var powerIndex = powerTileCol + POWER_COLS*powerTileRow;
	var powerType = powerGrid[powerIndex];
	return powerType;
}


function setPowerType(power, col, row){
	drawBitmapCenteredAtLocation(power, col, row);
}



