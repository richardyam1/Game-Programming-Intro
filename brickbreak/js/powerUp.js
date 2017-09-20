var activePowers = [];
var powerReveal = false;
var currentPowerAmount = 0;
var powerLimit = 15;
var powerCapsuleLimit;
var powerDrop = 0;
const FIRE= 1;
const CANNON = 2;
const MULTI = 3;
const STICKY = 4;
const POINTS = 5;
const POWER_COLS = 10;
const POWER_ROWS = 14;
const POWER_W = 50;
const POWER_H = 28;

var powerGrid = [	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
				    0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	
					1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	
					1,	2,	3,	4,	5,	1,	1,	1,	1,	1,
					];


//var powerGrid = brickGrid.slice();

function powerClass(col, row){
	this.x = col * BRICK_W + 35;
	this.y = row * BRICK_H + 10;
	this.dy = 6;
	this.powerTypePic;
	this.active = false;
}

function setPowers(){
	for(var eachCol = 0; eachCol < POWER_COLS; eachCol++){
		for(var eachRow = 0; eachRow < POWER_ROWS; eachRow++){
			if(isPowerAtTileCoord(eachCol, eachRow) > 0 && activePowers.length < powerLimit){
				var power = new powerClass(eachCol, eachRow);

				//document.getElementById("debugText").innerHTML = activePowers[0].x + " " + activePowers[0].y + " "+ activePowers[1].x + " " + activePowers[1].y + " "+ activePowers[2].x + " " + activePowers[2].y;
				//document.getElementById("debugText").innerHTML = power.x + " " + power.y;
				
				if(isPowerAtTileCoord(eachCol, eachRow) === FIRE){
					power.powerTypePic = powerFirePic;
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === CANNON){
					power.powerTypePic = powerCannonPic;
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === MULTI){
					power.powerTypePic = powerMultiPic;
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === STICKY){
					power.powerTypePic = powerStickyPic;
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === POINTS){
					power.powerTypePic = powerPointsPic;
				}

				activePowers.push(power);
				
			}
		}
	}
}

function drawPower(){
	for(var i = 0; i < activePowers.length; i++){
		setPowerType(activePowers[i].powerTypePic, activePowers[i].x, activePowers[i].y);
	}
}

/*
function drawPower(){
	for(var eachCol = 0; eachCol < POWER_COLS; eachCol++){
		for(var eachRow = 0; eachRow < POWER_ROWS; eachRow++){
			if(isPowerAtTileCoord(eachCol, eachRow) > 0){
				
				
					var power = new powerClass(eachCol, eachRow);
				    activePowers.push(power);
			
				
			
				
				//document.getElementById("debugText").innerHTML = activePowers[0].x + " " + activePowers[0].y + " "+ activePowers[1].x + " " + activePowers[1].y + " "+ activePowers[2].x + " " + activePowers[2].y;
				//document.getElementById("debugText").innerHTML = power.x + " " + power.y;
				
				if(isPowerAtTileCoord(eachCol, eachRow) === FIRE){
					setPowerType(powerFirePic, power.x, power.y);
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === CANNON){
					setPowerType(powerCannonPic, power.x, power.y);
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === MULTI){
					setPowerType(powerMultiPic, power.x, power.y);
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === STICKY){
					setPowerType(powerStickyPic, power.x, power.y);
				}
				else if(isPowerAtTileCoord(eachCol, eachRow) === POINTS){
					setPowerType(powerPointsPic, power.x, power.y);
				}
				
				
			}
		}
	}
}*/
//document.getElementById("debugText").innerHTML = activePowers[0].x + " " + activePowers[0].y + " "+ activePowers[1].x + " " + activePowers[1].y + " "+ activePowers[2].x + " " + activePowers[2].y;

function isPowerAtTileCoord(powerTileCol, powerTileRow){
	var powerIndex = powerTileCol + POWER_COLS*powerTileRow;
	var powerType = powerGrid[powerIndex];
	return powerType;
}

function setPowerType(power, col, row){
	//var powerLeftEdgeX = col;
	//var powerTopEdgeY = row;
	//if(powerReveal === true){
		drawBitmapCenteredAtLocation(power, col, row);
	//}
	//drawBitmapCenteredAtLocation(power, col, row);
}

function powerMove(){
	powerDrop +=2;
}


function powerFallWhenBrickBreaks(){

}

/*
1. Loop through powerGrid for index > 0
	a. Make it 50/50 chance of assigning power
		1.  Assign random power to each one if powerLimit is not reached

2.  When ball makes contact with tile that has power-up, draw power capsule and have it go down
	a. Make this.active === true

3.  When power contacts the paddle, activate power 

*/