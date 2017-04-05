	const KEY_LEFT_ARROW = 37;
	const KEY_UP_ARROW = 38;
	const KEY_RIGHT_ARROW = 39;
	const KEY_DOWN_ARROW = 40;
	const KEY_LETTER_W  = 87;
	const KEY_LETTER_A = 65;
	const KEY_LETTER_S = 83;
	const KEY_LETTER_D = 68;

	

	function keyPressed(evt){
		setKeyHoldState(evt.keyCode, p1, true);
		//prevents keys from performing its normal function when pressed(scrolling, typing)
		evt.preventDefault();
	}

	function keyReleased(evt){
		setKeyHoldState(evt.keyCode, p1, false);

	}

	function setKeyHoldState(thisKey, thisShip, setTo){
		if(thisKey === thisShip.controlKeyForTurnLeft){
			thisShip.keyHeld_TurnLeft = setTo;
		}
		if(thisKey === thisShip.controlKeyForTurnRight){
			thisShip.keyHeld_TurnRight = setTo;
		}
		if(thisKey === thisShip.controlKeyForGas){
			thisShip.keyHeld_Gas = setTo;
		}
		
	}

	function initInput(){
		document.addEventListener("keydown", keyPressed);
		document.addEventListener("keyup", keyReleased);

		//sets up control keys for p1 and p2
		p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
	}