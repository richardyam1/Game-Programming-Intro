	const UFO_SPEED = 1.9;
	const UFO_TIME_BETWEEN_CHANGE_DIR = 85;

	ufoClass.prototype = new movingWrapPositionClass();
	function ufoClass (){
		
		this.keyHeld_Gas = false;
		this.keyHeld_TurnLeft = false;
		this.keyHeld_TurnRight = false;

		this.init = function(whichGraphic){
			this.myBitmap = whichGraphic;
			this.reset();
		};//end of init

		this.superclassReset = this.reset;
		this.reset = function(){
			this.superclassReset();
			this.x = Math.random() * canvas.width;
    		this.y = Math.random() * canvas.height;
    		this.cyclesTilDirectionChange = 0;
			
		};//end of reset()

		this.superclassMove = this.move;
		this.move = function(){
			this.superclassMove();

			this.cyclesTilDirectionChange--;
			if(this.cyclesTilDirectionChange <= 0){
				var randAng = Math.random() * Math.PI * 2.0;
				this.xv = Math.cos(randAng) * UFO_SPEED;
				this.yv = Math.sin(randAng) * UFO_SPEED;
				this.cyclesTilDirectionChange = UFO_TIME_BETWEEN_CHANGE_DIR;
			}
			
		}; //end of move()

		this.draw = function(){
			drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, 0);	
		}; // end of draw

		

		

		


		
}