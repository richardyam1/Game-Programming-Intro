const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W  = 87;
const KEY_LETTER_A = 65;
const KEY_LETTER_S = 83;
const KEY_LETTER_D = 68;
const KEY_NUMBER_1 = 49;
const KEY_NUMPAD_0 = 96;
const KEY_SHIFT = 16;

function keyPressed(evt){
	setKeyHoldState(evt.keyCode, p1, true);
	if(cpuCar === false){
		setKeyHoldState(evt.keyCode, p2, true);
	}
	toggleDayAndNight(evt.keyCode);
	//prevents keys from performing its normal function when pressed(scrolling, typing)
	evt.preventDefault();
}

function keyReleased(evt){
	setKeyHoldState(evt.keyCode, p1, false);
	setKeyHoldState(evt.keyCode, p2, false);

}

function setKeyHoldState(thisKey, thisCar, setTo){
	if(thisKey === thisCar.controlKeyForTurnLeft){
		thisCar.keyHeld_TurnLeft = setTo;
	}
	if(thisKey === thisCar.controlKeyForTurnRight){
		thisCar.keyHeld_TurnRight = setTo;
	}
	if(thisKey === thisCar.controlKeyForGas){
		thisCar.keyHeld_Gas = setTo;
	}
	if(thisKey === thisCar.controlKeyForReverse){
		carBrake.play();
		thisCar.keyHeld_Reverse = setTo;
	}
	if(thisKey === thisCar.controlKeyForNitro && thisCar.usedNitro === false){
		thisCar.nitroBoost = true;
		setTimeout(function(){
			thisCar.nitroBoost = false; 
			thisCar.usedNitro = true;
		}, 5000)
	}
}

function toggleDayAndNight(thisKey){
	if(thisKey === KEY_NUMBER_1){
		if(currentTime === 0){
			currentTime = 1;
		}
		else{
			currentTime = 0;
		}
		imageList = [];
		loadImages();
	}
}


function initInput(){
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	//sets up control keys for p1 and p2
	p1.setupControls(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW, KEY_NUMPAD_0);
	p2.setupControls(KEY_LETTER_W, KEY_LETTER_S, KEY_LETTER_A, KEY_LETTER_D, KEY_SHIFT);
}