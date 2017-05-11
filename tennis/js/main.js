$(document).ready(function(){
    var ballX = 75;
    var ballY = 75;
    var ballSpeedX = 20;
    var ballSpeedY = Math.floor(Math.random() * (9 - 5)) + 5;
    var paddle1Y = 250;
    var paddle2Y = 250;
    var framesPerSecond = 30;
    var leftScore = 0;
    var rightScore = 0;
    var winScore = 11;
    var ballBounceOffPaddle = 0;
    var showingWinScreen = false;
    var backgroundMusic = new BackgroundMusicClass();
    var hitSound = new SoundOverlapsClass("audio/bloop");
    var missSound = new SoundOverlapsClass("audio/miss");
    var canvas;
    var convasContext;

    const PADDLE_HEIGHT = 80;
    const PADDLE_THICKNESS = 10;
    const cpuSpeed = 11;

    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    canvasContext.textAlign = "center";
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    function moveEverything(){
        if(showingWinScreen){
            return;
        }
        //moves right paddle
        moveComputerPaddle();

        //if ball goes over right edge
        if(ballX > canvas.width){
            if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
                hitSound.play();
                ballBounceOffPaddle++;
                if(ballBounceOffPaddle === 4 || ballBounceOffPaddle === 12){
                    ballSpeedX *= -1.2;
                }
                else{
                    ballSpeedX *= -1;
                }
                document.getElementById("debugText").innerHTML = ballSpeedX + " " + ballBounceOffPaddle;
                //point where the center of the paddle is located
                var centerPaddle2 = (paddle2Y + PADDLE_HEIGHT/2);
                //ball distance from center of paddle on collision
                var centerDistance2 = ballY - centerPaddle2;
                ballSpeedY = centerDistance2 * 0.35;
            }
            else{
                missSound.play();
                leftScore++;
                ballReset();
            }
        }
        
        //if ball goes over left edge
        if(ballX < 0){
            if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
                hitSound.play();
                ballBounceOffPaddle++;
                 if(ballBounceOffPaddle === 4 || ballBounceOffPaddle === 12){
                    ballSpeedX * -1.2;
                }
                else{
                    ballSpeedX *= -1;
                }
                 document.getElementById("debugText").innerHTML = ballSpeedX + " " + ballBounceOffPaddle;
                //point where the center of the paddle is located
                var centerPaddle1 = (paddle1Y + PADDLE_HEIGHT/2);
                //ball distance from center of paddle on collision
                var centerDistance1 = ballY - centerPaddle1;
                ballSpeedY = centerDistance1 * 0.35;
            }
            else{
                missSound.play();
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

    function colorText(words, textX, textY, fillColor){
        canvasContext.fillStyle = fillColor;
        canvasContext.fillText(words, textX, textY);
    }

    function drawEverything(){
        //clear the game view by filling with black
        colorRect(0, 0, canvas.width, canvas.height, "black");

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
            //draw net
            for(var i = 0; i < canvas.height; i+= 40){
                colorRect(canvas.width/2, i, 2, 20, "white");
            }
            //draw left paddle
            colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

            //draw right paddle
            colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, "white");

            //draw a white circle
            colorCircle(ballX, ballY, 10, "white");
   
        }
        //score for left side
        colorText(leftScore, 100, 100, "white");

        //score for right side
        colorText(rightScore, canvas.width - 100, 100, "white");


        
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
     
        //checks if the maximum score is reached
        if(leftScore >= winScore || rightScore >=winScore){
            showingWinScreen = true;
        }

        //Changes direction of the ball when ball is served
        ballSpeedX = 20;
        ballSpeedX *= -1;
        ballX = canvas.width/2;
        ballY = canvas.height/2;
        ballBounceOffPaddle = 0;
        ballSpeedY = Math.floor(Math.random() * (9 - 5)) + 5;
    }

    function moveComputerPaddle(){
        //if ball is below paddle center
        if (ballY > (paddle2Y + PADDLE_HEIGHT/2) + 35){
            paddle2Y += cpuSpeed;
        }
        //if ball is above paddle center
        else if (ballY < (paddle2Y + PADDLE_HEIGHT/2 - 35)){
            paddle2Y -= cpuSpeed;
        }
    }

    $(canvas).mousemove(function(evt){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });

    $(canvas).mousedown(function(){
        if (showingWinScreen){
            leftScore = 0;
            rightScore = 0;
            showingWinScreen = false;
        }
    });
     
});