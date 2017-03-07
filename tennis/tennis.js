$(document).ready(function(){
    var ballX = 75;
    var ballY = 75;
    var ballSpeedX = 12;
    var ballSpeedY = 12;
    var paddle1Y = 250;
    var framesPerSecond = 30;
    const PADDLE_HEIGHT = 100;
    var canvas;
    var convasContext;
   

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    function moveEverything(){
        if(ballX > canvas.width){
            ballSpeedX *= -1;
        }
        if(ballY > canvas.height || ballY < 0){
            ballSpeedY *= -1;
        }
        if(ballX < 0){
            if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
                ballSpeedX *= -1;
            }
            else{
                ballReset();
            }
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
        colorRect(0, paddle1Y, 10, 100, "white");

        //draw a white circle
        colorCircle(ballX, ballY, 10, "white");
    }

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

    function ballReset(){
        ballX = canvas.width/2;
        ballY = canvas.height/2;
    }

    $(canvas).mousemove(function(evt){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });

    /*
    canvas.addEventListener("mousemove", function(evt){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });*/
});