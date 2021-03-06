	const SPACESPEED_DECAY_MULT = 0.99;
	const THRUST_POWER = 0.15;
	const TURN_RATE = 0.03;

	shipClass.prototype = new movingWrapPositionClass();
	function shipClass (){
		
		this.keyHeld_Gas = false;
		this.keyHeld_TurnLeft = false;
		this.keyHeld_TurnRight = false;

		this.init = function(whichGraphic){
			this.myShot = new shotClass();
			this.myBitmap = whichGraphic;
			this.reset();
		};//end of init

		this.superclassReset = this.reset;
		this.reset = function(){
			this.superclassReset();
			this.ang = (-0.5 * Math.PI);
			this.x = canvas.width/2;
    		this.y = canvas.height/2;
    		this.myShot.reset();
			
		};//end of reset()

		

		this.setupControls = function(forwardKey, leftKey, rightKey, shotKey){
				this.controlKeyForGas = forwardKey;
				this.controlKeyForTurnLeft = leftKey;
				this.controlKeyForTurnRight = rightKey;
				this.controlKeyForShotFire = shotKey;
			} //end of setupControls

		this.draw = function(){
			this.myShot.draw();
			drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang );	
		}; // end of draw

		this.superclassMove = this.move;
		this.move = function(){
			
			if(this.keyHeld_TurnLeft){
				this.ang += -TURN_RATE*Math.PI;
			}

			if(this.keyHeld_TurnRight){
				this.ang += TURN_RATE*Math.PI;
			}
			
			if(this.keyHeld_Gas){
				this.xv += Math.cos(this.ang) * THRUST_POWER; ////
     			this.yv += Math.sin(this.ang) * THRUST_POWER;			
     		}
			

			 this.x +=  this.xv;
			 this.y +=  this.yv;

			this.superclassMove();
			this.xv *= SPACESPEED_DECAY_MULT;
			this.yv *= SPACESPEED_DECAY_MULT;
			this.myShot.move();
		}; //end of move()

		this.checkMyShipAndShotCollisionAgainst = function(thisEnemy){
			if(thisEnemy.isOverlappingPoint(this.x, this.y)){
				this.reset();
				document.getElementById("debugText").innerHTML = "Player Crashed!";
			}
			if(this.myShot.hitTest(thisEnemy)){
				thisEnemy.reset();
				this.myShot.reset();
				document.getElementById("debugText").innerHTML = "Enemy Blasted!";
			}
		}
	


		this.cannonFire = function(){
			if(this.myShot.isShotReadyToFire() ){
				this.myShot.shootFrom(this);
			}
		};
}