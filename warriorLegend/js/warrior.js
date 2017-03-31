	const PLAYER_MOVE_SPEED = 3.0;
	function warriorClass (){
		this.x = 75;
		this.y = 75;
		this.keyHeld_North;
		this.keyHeld_East;
		this.keyHeld_South;
		this.keyHeld_West;

		this.setupControls = function(northKey, eastKey, southKey, westKey){
				this.controlKeyForNorth = northKey;
				this.controlKeyForEast= eastKey;
				this.controlKeyForSouth = southKey;
				this.controlKeyForWest = westKey;
			}

		this.draw = function(){
			drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0.0);	
		};

		this.move = function(){
			var nextX = this.x;
			var nextY = this.y;

			if(this.keyHeld_North){
				nextY -= PLAYER_MOVE_SPEED;
			}
			if(this.keyHeld_East){
				nextX += PLAYER_MOVE_SPEED;
			}
			if(this.keyHeld_South){
				nextY += PLAYER_MOVE_SPEED;
			}
			if(this.keyHeld_West){
				nextX -= PLAYER_MOVE_SPEED;
			}


			var walkIntoTileType = getTrackAtPixelCoord(nextX, nextY);

			if(walkIntoTileType === TRACK_ROAD){
				this.x = nextX;
				this.y = nextY;
			}
			else if(walkIntoTileType === TRACK_GOAL){
				document.getElementById("debugText").innerHTML = this.myName + " won the race";
				this.reset();
			}
			
			else{
				this.speed = 0.0;
			}

			this.speed *= GROUNDSPEED_DECAY_MULT;
		};
		this.reset = function(){
			
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