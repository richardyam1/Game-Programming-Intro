$(document).ready(function(){
    var ballX = 75;
    var ballY = 75;
    var ballSpeedX = 6;
    var ballSpeedY = 6;
    var paddle1Y = 250;
    var paddle2Y = 250;
    var framesPerSecond = 30;
    const PADDLE_HEIGHT = 100;
    const PADDLE_THICKNESS = 10;
    var leftScore = 0;
    var rightScore = 0;
    var canvas;
    var convasContext;
   

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    function moveEverything(){
        //if ball goes over right edge
        if(ballX > canvas.width){
            if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
                ballSpeedX *= -1;
                //point where the center of the paddle is located
                var centerPaddle2 = (paddle2Y + PADDLE_HEIGHT/2);
                //ball distance from center of paddle on collision
                var centerDistance2 = ballY - centerPaddle2;
                ballSpeedY = centerDistance2 * 0.35;
            }
            else{
                leftScore++;
                ballReset();
            }
        }
        
        //if ball goes over left edge
        if(ballX < 0){
            if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
                ballSpeedX *= -1;
                //point where the center of the paddle is located
                var centerPaddle1 = (paddle1Y + PADDLE_HEIGHT/2);
                //ball distance from center of paddle on collision
                var centerDistance1 = ballY - centerPaddle1;
                ballSpeedY = centerDistance1 * 0.35;
            }
            else{
                rightScore++;
                ballReset();
            }
        }

        //redirects ball when it hits ceiling or floor
        if(ballY > canvas.height || ballY < 0) {
            ballSpeedY *= -1;
        }

        //Moves ball horizontally
        ballX += ballSpeedX;

        //Moves ball Vertically
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
        colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

        //draw right paddle
        colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

        //draw a white circle
        colorCircle(ballX, ballY, 10, "white");

        //score for left side
        canvasContext.fillText(leftScore, 100, 100);

        //score for right side
        canvasContext.fillText(rightScore, canvas.width - 100, 100);
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
        //Changes direction of the ball when ball is served
        ballSpeedX *= -1;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
    }


    $(canvas).mousemove(function(evt){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });

    
   
});