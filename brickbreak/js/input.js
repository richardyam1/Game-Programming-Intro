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

var mouseX;
var mouseY;
function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    //account for the margins, canvas position on page, scroll amount, etc.
    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.left - root.scrollTop;
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

function mousedownHandler(evt){
    if(powerCannon === true){
        createLaser();
        laserShoot.play();
        laserAmmo--;
    }
    
}

function mouseupHandler(evt){
    if(showTitleScreen === false){
        ballSuspended = false;
    }
   for(var j = 0; j < numBalls; j++){
        var ball = balls[j];
        if(ball.suspended === true){
            ball.suspended = false;
        } 
    }

    showTitleScreen = false;
    gameClear = false;
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
        laserAmmo = 10;
    }

    if(key === KEY_NUMBER_3){
        number3KeyPressed = setTo;
        numBalls = 3;
        createExtraBalls();
        powerMulti = true;
        //createBall();
    }

    if(key === KEY_NUMBER_4){
        number4KeyPressed = setTo;
        powerSticky = true;
        ballSuspendedAmount = 3;
    }

    if(key === KEY_NUMBER_5){
        number5KeyPressed = setTo;
        score += 1000;
       
    }
} 

function initInput(){
    canvas.addEventListener("mousemove", mousemoveHandler);
    canvas.addEventListener("mouseup", mouseupHandler);
    canvas.addEventListener("mousedown", mousedownHandler);
    document.addEventListener("keyup", keyReleased);
    document.addEventListener("keydown", keyPressed);

}