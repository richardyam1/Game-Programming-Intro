const KEY_NUMBER_1 = 49;
const KEY_NUMBER_2 = 50;
const KEY_NUMBER_3 = 51;
const KEY_NUMBER_4 = 52;
const KEY_NUMBER_5 = 53;

var number1KeyPressed = false;
var number2KeyPressed = false;
var number3KeyPressed = false;
var number4KeyPressed = false;
var number5KeyPressed = false;


function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    //account for the margins, canvas position on page, scroll amount, etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.left - root.scrollTop;
    return{
        x: mouseX, 
        y: mouseY
    };
}



function mousemoveHandler(evt){
    var mousePos = calculateMousePos(evt);
    paddleX = mousePos.x - (PADDLE_WIDTH/2);
    if(ballSuspended === true){
        if(powerSticky === false){
            ballX = (paddleX + (PADDLE_WIDTH/2)) + 10;
        } 
        else if(powerSticky === true){
            ballX = paddleX + ballDistanceFromLeftPaddleEdge;
        }
    }
}

function mouseupHandler(evt){
    if(showTitleScreen === false){
        ballSuspended = false;
    }
    showTitleScreen = false;
    
}

function keyPressed(evt){
    setKeyHoldState(evt.keyCode, true);
    evt.preventDefault();
}

function keyReleased(evt){
    setKeyHoldState(evt.keyCode, false);
}

function setKeyHoldState(key,setTo){
    if(key === KEY_NUMBER_1){
        number1KeyPressed = setTo;
        powerFire = true;   
    }

    if(key === KEY_NUMBER_2){
        number2KeyPressed = setTo;
        powerCannon = true;
    }

    if(key === KEY_NUMBER_3){
        number1KeyPressed = setTo;
        powerMulti = true;
    }

    if(key === KEY_NUMBER_4){
        number2KeyPressed = setTo;
        powerSticky = true;
    }

    if(key === KEY_NUMBER_5){
        number1KeyPressed = setTo;
        score += 1000;
       
    }
} 

function initInput(){
    canvas.addEventListener("mousemove", mousemoveHandler);
    canvas.addEventListener("click", mouseupHandler);
    document.addEventListener("keyup", keyReleased);
    document.addEventListener("keydown", keyPressed);

}