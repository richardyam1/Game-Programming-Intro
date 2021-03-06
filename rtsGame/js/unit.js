function unitClass (){
	const UNIT_PLACEHOLDER_RADIUS = 5;
	const UNIT_SELECT_DIM_HALF = UNIT_PLACEHOLDER_RADIUS + 3;
	const UNIT_PIXELS_MOVE_RATE = 2;
	const UNIT_RANKS_SPACING = UNIT_PLACEHOLDER_RADIUS * 3;
	const UNIT_ATTACK_RANGE = 55;
	const UNIT_AI_ATTACK_INITIATE = UNIT_ATTACK_RANGE + 10;
	const UNIT_PLAYABLE_AREA_MARGIN = 20;
	this.resetAndSetPlayerTeam = function(playerTeam){
		this.playerControlled = playerTeam;
		this.x = Math.random() * canvas.width/4;
		this.y = Math.random() * canvas.height/4;
		this.myTarget = null;
		if(this.playerControlled === false){
			this.x = canvas.width - this.x;
			this.y = canvas.height  - this.y;
			this.unitColor = "red";
		}
		else{
			this.unitColor = "white";
		}
		this.gotoX = this.x;
		this.gotoY = this.y;
		this.isDead = false;
	};

	this.drawSelectionBox  = function(){
		coloredOutlineRectCornerToCorner(this.x - UNIT_SELECT_DIM_HALF, 
										 this.y - UNIT_SELECT_DIM_HALF,
										 this.x + UNIT_SELECT_DIM_HALF,
										 this.y + UNIT_SELECT_DIM_HALF, "green");
	};

	this.draw = function(){
		if(this.isDead === false){
			colorCircle(this.x, this.y, UNIT_PLACEHOLDER_RADIUS, this.unitColor);
		}

	};

	this.move = function(){
		if(this.myTarget !== null){
			if(this.myTarget.isDead){
				this.myTarget = null;
				this.gotoX = this.x;
				this.gotoY = this.y;
			}
			else if(this.distFrom(this.myTarget.x, this.myTarget.y) > UNIT_ATTACK_RANGE){
				this.gotoX = this.myTarget.x;
				this.gotoY = this.myTarget.y;
			}
			else{
				this.myTarget.isDead = true;
				soonCheckUnitsToClear();
				this.gotoX = this.x;
				this.gotoY = this.y;
			}
		}
		else if(this.playerControlled === false){
			if(Math.random() < 0.02){
				var nearestOpponentFound = findClosestUnitInRange(this.x, this.y, UNIT_AI_ATTACK_INITIATE, playerUnits);
				
				if(nearestOpponentFound !== null){
					this.myTarget = nearestOpponentFound;
				}
				else{
					this.gotoX = this.x - Math.random() * 70;
					this.gotoY = this.y - Math.random() * 70;
				}//end of else, no target found in attack radius
			}//end of randomized ai response lag check
		}//end of playerControlled === false
		var deltaX = this.gotoX-this.x;
		var deltaY = this.gotoY-this.y;
		this.keepInPlayableArea(); 
		var distToGo = Math.sqrt(deltaX*deltaX + deltaY*deltaY);
		var moveX = UNIT_PIXELS_MOVE_RATE * deltaX/distToGo;
		var moveY = UNIT_PIXELS_MOVE_RATE * deltaY/distToGo;
		if(distToGo > UNIT_PIXELS_MOVE_RATE){
			this.x += moveX;
			this.y += moveY;
		}
		else{
			this.x = this.gotoX;
			this.y = this.gotoY;
		}
	};

	this.gotoNear = function(aroundX, aroundY, formationPos, formationDim){
		var colNum = formationPos % formationDim;
		var rowNum = Math.floor(formationPos/formationDim);
		this.gotoX = aroundX + colNum * UNIT_RANKS_SPACING;
		this.gotoY = aroundY + rowNum * UNIT_RANKS_SPACING;
	};

	this.setTarget = function(newTarget){
		this.myTarget = newTarget;
	};

	this.isInBox = function(x1, y1, x2, y2){
		var leftX, rightX;
		if(x1 < x2){
			leftX = x1;
			rightX = x2;
		}
		else{
			leftX = x2;
			rightX = x1;
		}	

		var topY, bottomY;
		if(y1 < y2){
			topY = y1;
			bottomY = y2;
		}
		else{
			topY = y2;
			bottomY = y1;
		}

		if(this.x < leftX){
			return false;
		}
		if(this.y < topY){
			return false;
		}
		if(this.x > rightX){
			return false;
		}
		if(this.y > bottomY){
			return false;
		}
		return true;
	};

	this.distFrom = function(otherX, otherY){
		var deltaX = otherX - this.x;
		var deltaY = otherY - this.y;
		return Math.sqrt(deltaX*deltaX + deltaY*deltaY);
	};

	this.keepInPlayableArea = function(){
		if(this.gotoX < UNIT_PLAYABLE_AREA_MARGIN){
			this.gotoX = UNIT_PLAYABLE_AREA_MARGIN;
		}
		else if(this.gotoX > canvas.width - UNIT_PLAYABLE_AREA_MARGIN){
			this.gotoX = canvas.width - UNIT_PLAYABLE_AREA_MARGIN;
		}

		if(this.gotoY < UNIT_PLAYABLE_AREA_MARGIN){
			this.gotoY = UNIT_PLAYABLE_AREA_MARGIN;
		}
		else if(this.gotoY > canvas.height - UNIT_PLAYABLE_AREA_MARGIN){
			this.gotoY = canvas.height - UNIT_PLAYABLE_AREA_MARGIN;
		}
	};
}