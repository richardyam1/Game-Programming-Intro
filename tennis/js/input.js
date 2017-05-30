const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LETTER_W  = 87;
const KEY_LETTER_S = 83;
const KEY_NUMBER_1 = 49;
const KEY_NUMBER_2 = 50;


var upKeyPressed = false;
var downKeyPressed = false;
var wKeyPressed = false;
var sKeyPressed = false;
var number1KeyPressed = false;
var number2KeyPressed = false;

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    //account for the margins, canvas position on page, scroll amount, etc.
    var mouseX = evt.pageX - rect.left - root.scrollLeft;
    var mouseY = evt.pageY - rect.top - root.scrollTop;
    return{
        x: mouseX,
        y: mouseY
    };
}

function mousemoveHandler(evt){
    if(twoPlayerMode === false){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    }
}

function resetGame(){
    if (showingMenuScreen){
        leftScore = 0;
        rightScore = 0;
        showingMenuScreen = false;
    }
}

function keyPressed(evt){
    setKeyHoldState(evt.keyCode, true);
    evt.preventDefault();
}

function keyReleased(evt){
    setKeyHoldState(evt.keyCode, false);
}

function setKeyHoldState(key,setTo){
    if(key === KEY_LETTER_W){
        wKeyPressed = setTo;
    }
    if(key === KEY_LETTER_S){
        sKeyPressed = setTo;
    }
    if(key === KEY_UP_ARROW){
        upKeyPressed = setTo;
    }
    if(key === KEY_DOWN_ARROW){
        downKeyPressed = setTo;
    }
    if(key === KEY_NUMBER_1){
        number1KeyPressed = setTo;
        twoPlayerMode = false;
        resetGame();
    }
    if(key === KEY_NUMBER_2){
        number2KeyPressed = setTo;
        twoPlayerMode = true;
        resetGame();    
    }
}

function initInput(){
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);
    canvas.addEventListener("mousemove", mousemoveHandler);
    canvas.addEventListener("mousemove", mousedownHandler);
    
}