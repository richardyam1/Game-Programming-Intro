var canvas;
var canvasContext;
var leftScore = 0;
var rightScore = 0;
var winScore = 11;
var backgroundMusic = new BackgroundMusicClass();
var hitSound = new SoundOverlapsClass("audio/hit");
var missSound = new SoundOverlapsClass("audio/miss");
var twoPlayerMode = true;
//have game start on the menu screen
var showingMenuScreen = true;


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
    //immediately end the function if on the menu screen
    if(showingMenuScreen){
        return;
    }
    //moves right paddle if 1-player mode is selected
    if(twoPlayerMode === false){
        moveComputerPaddle();
    }
    //switches controls to keyboard when in 2-player mode
    else if(twoPlayerMode === true){
        movePlayerPaddle();
    }
    ballMove();
    
}


function drawEverything(){
       
    canvasContext.drawImage(backgroundPic, 0, 0);
    if(showingMenuScreen){
        //empty array to remove ball image when game is over
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
        //inserts the images for paddles
        paddleDraw();

        //draw movement trail for ball
        trailDraw();

        //call this last so ball image overlaps the front of the movement trail
        ballDraw();

    }
    //score for left side
    colorText(leftScore, 110, 100, "white");

    //score for right side
    colorText(rightScore, canvas.width - 110, 100, "white");   
}



