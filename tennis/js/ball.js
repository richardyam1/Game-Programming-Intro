var ballX = 75;
var ballY = 75;
var ballSpeedX = 20;
var ballSpeedY = Math.floor(Math.random() * (9 - 5)) + 5;
var ballBounceOffPaddle = 0;

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

function ballMove(){
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

function ballDraw(){
    //Insert Tennis ball image
    drawBitmapCenteredAtLocation(ballPic, ballX, ballY);
}