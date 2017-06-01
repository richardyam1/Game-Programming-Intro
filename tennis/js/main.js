var canvas;
var canvasContext;
var showingMenuScreen = true;
var leftScore = 0;
var rightScore = 0;
var winScore = 1;
var backgroundMusic = new BackgroundMusicClass();
var hitSound = new SoundOverlapsClass("audio/hit");
var missSound = new SoundOverlapsClass("audio/miss");
var twoPlayerMode = true;

$(document).ready(function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    canvasContext.textAlign = "center";
    loadImages();
    
});


function loadingDoneSoStartGame(){
        var framesPerSecond = 30;
        setInterval(function(){
            drawEverything();
            moveEverything();
        }, 1000/framesPerSecond);
        initInput();
    }

function moveEverything(){
    if(showingMenuScreen){
        return;
    }
    //moves right paddle
    if(twoPlayerMode === false){
        moveComputerPaddle();
    }
    else if(twoPlayerMode === true){
        movePlayerPaddle();
    }
    ballMove();
    
}


function drawEverything(){
    //clear the game view by filling with black
    //colorRect(0, 0, canvas.width, canvas.height, "black");
    canvasContext.drawImage(backgroundPic, 0, 0);
    if(showingMenuScreen){
        ballPosition = [];
        if(leftScore >= winScore){
            colorText("Left side wins", canvas.width/2, 100, "white");
        }
        else if(rightScore >= winScore){
            colorText("Right side wins", canvas.width/2, 100, "white");
        }
        colorText("Press the corresponding number key to choose what mode you want to play", canvas.width/2, 150, "white");
        colorText("1: Single player.  Control the left paddle using the mouse", canvas.width/2, 200, "white");
        colorText("2: Two-player.  Control the left paddle using the W/S key.  Control the right paddle with the Up/Down key", canvas.width/2, 250, "white");

       
    }

    else{

        paddleDraw();

        //draw left paddle
       // colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

        //draw right paddle
        //colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");
        trailDraw();
        ballDraw();

    }
    //score for left side
    colorText(leftScore, 110, 100, "white");

    //score for right side
    colorText(rightScore, canvas.width - 110, 100, "white");   
}



