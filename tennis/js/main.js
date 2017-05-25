var canvas;
var canvasContext;
var showingWinScreen = false;
var leftScore = 0;
var rightScore = 0;
var winScore = 11;
var backgroundMusic = new BackgroundMusicClass();
var hitSound = new SoundOverlapsClass("audio/hit");
var missSound = new SoundOverlapsClass("audio/miss");

$(document).ready(function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    canvasContext.textAlign = "center";
    $(canvas).mousemove(mousemoveHandler);
    $(canvas).mousedown(mousedownHandler);
    loadImages();
    
});


function loadingDoneSoStartGame(){
        var framesPerSecond = 30;
        setInterval(function(){
            drawEverything(); 
            moveEverything();
        }, 1000/framesPerSecond);
       
    }

function moveEverything(){
    if(showingWinScreen){
        return;
    }
    //moves right paddle
    moveComputerPaddle();
    ballMove();
    
}

function drawEverything(){
    //clear the game view by filling with black
    //colorRect(0, 0, canvas.width, canvas.height, "black");
    canvasContext.drawImage(backgroundPic, 0, 0);
    if(showingWinScreen){
        if(leftScore >= winScore){
            colorText("Left side wins", canvas.width/2, canvas.height/2, "white");
        }
        else if(rightScore >= winScore){
            colorText("Right side wins", canvas.width/2, canvas.height/2, "white");
        }
        colorText("Click to reset", canvas.width/2, canvas.height/2 + 50, "white");
    }

    else{

        paddleDraw();

        //draw left paddle
       // colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

        //draw right paddle
        //colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

        ballDraw();

    }
    //score for left side
    colorText(leftScore, 110, 100, "white");

    //score for right side
    colorText(rightScore, canvas.width - 110, 100, "white");   
}

