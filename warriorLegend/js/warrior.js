	const GROUNDSPEED_DECAY_MULT = 0.94;
	const DRIVE_POWER = 0.5;
	const REVERSE_POWER = 0.2;
	const TURN_RATE = 0.03;
	const MIN_TURN_SPEED = 0.5;
	function warriorClass (){
		this.x = 75;
		this.y = 75;
		this.keyHeld_Gas = false;
		this.keyHeld_Reverse = false;
		this.keyHeld_TurnLeft = false;
		this.keyHeld_TurnRight = false;

		this.setupControls = function(forwardKey, backKey, leftKey, rightKey){
				this.controlKeyForGas = forwardKey;
				this.controlKeyForReverse = backKey;
				this.controlKeyForTurnLeft = leftKey;
				this.controlKeyForTurnRight = rightKey;
			}

		this.draw = function(){
			drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang );	
		};

		this.move = function(){
			if(Math.abs(this.speed) >= MIN_TURN_SPEED){
				if(this.keyHeld_TurnLeft){
					this.ang += -TURN_RATE*Math.PI;
				}
				if(this.keyHeld_TurnRight){
					this.ang += TURN_RATE*Math.PI;
				}
			}
			if(this.keyHeld_Gas){
				this.speed += DRIVE_POWER;
			}
			if(this.keyHeld_Reverse){
				this.speed += -REVERSE_POWER;
			}

			

			var nextX = this.x + Math.cos(this.ang) * this.speed;
			var nextY = this.y + Math.sin(this.ang) * this.speed;

			var drivingIntoTileType = getTrackAtPixelCoord(nextX, nextY);

			if(drivingIntoTileType === TRACK_ROAD){
				this.x = nextX;
				this.y = nextY;
			}
			else if(drivingIntoTileType === TRACK_GOAL){
				document.getElementById("debugText").innerHTML = this.myName + " won the race";
				this.reset();
			}
			
			else{
				this.speed = 0.0;
			}

			this.speed *= GROUNDSPEED_DECAY_MULT;
		};
		this.reset = function(){
			this.speed = 0;
			this.ang = (-0.5 * Math.PI);
			if(this.homeX === undefined){
				for(var i = 0; i < trackGrid.length; i++){
					if(trackGrid[i] === TRACK_PLAYER){
						var tileRow = Math.floor(i/TRACK_COLS);
						var tileCol = i%TRACK_COLS;
						this.homeX = tileCol * TRACK_W + 0.5*TRACK_W;
						this.homeY = tileRow * TRACK_H + 0.5*TRACK_H;
						trackGrid[i] = TRACK_ROAD;
						break;
					}
				}
			}
			this.x = this.homeX;
			this.y = this.homeY;
		};

		this.init = function(whichGraphic, whichName){
			this.myBitmap = whichGraphic;
			this.myName = whichName;
			this.reset();
		};
}