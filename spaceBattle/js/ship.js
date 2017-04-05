	const GROUNDSPEED_DECAY_MULT = 0.94;
	const DRIVE_POWER = 0.5;
	const REVERSE_POWER = 0.2;
	const TURN_RATE = 0.03;
	const MIN_TURN_SPEED = 0.5;
	//Use class so both cars have access to code below.
	function shipClass (){
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

			 this.x += Math.cos(this.ang) * this.speed;
			 this.y += Math.sin(this.ang) * this.speed;

			
			//slows down the car when key is not pressed
			this.speed *= GROUNDSPEED_DECAY_MULT;
			this.handleScreenWrap();
		};
		//reset car to starting position when goal line is reached
		this.reset = function(){
			//reset speed so car resets to a complete stop
			this.speed = 0;
			this.ang = (-0.5 * Math.PI);
			this.x = canvas.width/2;
    		this.y = canvas.height/2;
			
		};

		//Initialize car for p1 and p2
		this.init = function(whichGraphic){
			this.myBitmap = whichGraphic;
			this.reset();
		};

		this.handleScreenWrap = function(){
			if (this.x < 0){
				this.x += canvas.width;
			}
			else if(this.x > canvas.width){
				this.x += -canvas.width;
			}

			if(this.y < 0){
				this.y += canvas.height;
			}
			else if(this.y > canvas.height){
				this.y += -canvas.height;
			}
		};
}