$(document).ready(function(){
    var ballX = 75;
    var ballY = 75;
    var ballSpeedX = 12;
    var ballSpeedY = 12;
    var framesPerSecond = 30;
    var canvas;
    var convasContext;
   

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    function moveEverything(){
        if(ballX > canvas.width || ballX < 0){
            ballSpeedX *= -1;
        }
        if(ballY > canvas.height || ballY < 0){
            ballSpeedY *= -1;
        }
        ballX += ballSpeedX;
        ballY += ballSpeedY;
    }

    function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor){
        canvasContext.fillStyle = fillColor;
        canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
    }

    function colorCircle(centerX, centerY, radius, fillColor){
        canvasContext.fillStyle = fillColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
        canvasContext.fill();
    }

    function drawEverything(){
        //clear the game view by filling with black
        colorRect(0, 0, canvas.width, canvas.height, "black");

        //draw left paddle
        colorRect(0, 250, 10, 100, "white");

        //draw a white circle
        colorCircle(ballX, ballY, 10, "white");
    }
});