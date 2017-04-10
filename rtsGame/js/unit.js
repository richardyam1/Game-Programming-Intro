function unitClass (){
	const UNIT_PLACEHOLDER_RADIUS = 5;
	this.reset = function(){
		this.x = canvas.width/2;
		this.y = canvas.height/2
		this.isDead = false;
	}

	this.draw = function(){
		if(this.isDead == false){
			colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, "white");
		}
	}
} 