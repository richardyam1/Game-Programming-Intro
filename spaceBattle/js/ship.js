	const SPACESPEED_DECAY_MULT = 0.99;
	const THRUST_POWER = 0.15;
	const TURN_RATE = 0.03;
	function shipClass (){
		this.x = 75;
		this.y = 75;
		this.keyHeld_Gas = false;
		this.keyHeld_TurnLeft = false;
		this.keyHeld_TurnRight = false;

		this.setupControls = function(forwardKey, backKey, leftKey, rightKey){
				this.controlKeyForGas = forwardKey;
				this.controlKeyForTurnLeft = leftKey;
				this.controlKeyForTurnRight = rightKey;
			}

		this.draw = function(){
			drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang );	
		};

		this.move = function(){
			
				if(this.keyHeld_TurnLeft){
					this.ang += -TURN_RATE*Math.PI;
				}
				if(this.keyHeld_TurnRight){
					this.ang += TURN_RATE*Math.PI;
				}
			
			if(this.keyHeld_Gas){
				this.driftX += Math.cos(this.ang) * THRUST_POWER; ////
     			this.driftY += Math.sin(this.ang) * THRUST_POWER;			
     		}
			

			 this.x +=  this.driftX;
			 this.y +=  this.driftY;

			
			this.driftX *= SPACESPEED_DECAY_MULT;
			this.driftY *= SPACESPEED_DECAY_MULT;
			this.handleScreenWrap();
		};
		this.reset = function(){
			this.driftX = 0;
			this.driftY = 0;
			this.ang = (-0.5 * Math.PI);
			this.x = canvas.width/2;
    		this.y = canvas.height/2;
			
		};

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