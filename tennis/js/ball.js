var ballX = 75;
var ballY = 75;
var ballSpeedX = 10;
var ballSpeedY = Math.floor(Math.random() * (9 - 5)) + 5;
var ballBounceOffPaddle = 0;
var direction;
const MIN_BALL_SPEED = 10;
const MID_BALL_SPEED = 14;
const MAX_BALL_SPEED = 18;

function ballReset(){
    //checks if the maximum score is reached
    if(leftScore >= winScore || rightScore >=winScore){
        showingWinScreen = true;
    }

    //Changes direction of the ball when ball is served
    //Reflect ball to right if going left
    if(ballSpeedX < 0){
        direction = -1;
    }
    //Reflect ball to left if going right
    else{
        direction = 1;
    }
    ballSpeedX = MIN_BALL_SPEED * direction;
    //Reset ball to center
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    ballBounceOffPaddle = 0;
    ballSpeedY = Math.floor(Math.random() * (9 - 5)) + 5;
}

function changeBallSpeedAndDirection(){
    
    //Reflect ball to right if going left
    if(ballSpeedX < 0){
        direction = -1;
    }
    //Reflect ball to left if going right
    else{
        direction = 1;
    }


    if(ballBounceOffPaddle === 4){ 
        ballSpeedX = MID_BALL_SPEED * direction;        
    }

    if (ballBounceOffPaddle === 12){
        ballSpeedX = MAX_BALL_SPEED * direction;
    }

    ballSpeedX = -ballSpeedX;
}

function ballMove(){
    //bounce off paddle if going right
    document.getElementById("debugText").innerHTML = "paddle1Y top: " + paddle1Y + "<br>" +" paddle1Y bottom " + (paddle1Y + PADDLE_HEIGHT) + "<br>" +" ballY: " + ballY + "<br>" + "paddle1X left edge: " +DIST_FROM_EDGE + "<br>" + "paddle1X right edge: " + ((DIST_FROM_EDGE) + player1Paddle.width) + "<br>" + "ballX: " + ballX;
    if(ballSpeedX > 0){
        if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT){
             if(ballX < canvas.width - DIST_FROM_EDGE && ballX > canvas.width - (DIST_FROM_EDGE + PADDLE_THICKNESS)){
                hitSound.play();
                ballBounceOffPaddle++;
                changeBallSpeedAndDirection();
                //point where the center of the paddle is located
                var centerPaddle2 = (paddle2Y + PADDLE_HEIGHT/2);
                //ball distance from center of paddle on collision
                var centerDistance2 = ballY - centerPaddle2;
                ballSpeedY = centerDistance2 * 0.35;
            }
        }

         if(ballX > canvas.width){
            missSound.play();
            leftScore++;
            ballReset();
                
         }
    }
    
    //bounce off paddle if going left.  ballSpeedX is negative when going left
    if(ballSpeedX < 0){
        if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
            if(ballX > DIST_FROM_EDGE && ballX < DIST_FROM_EDGE + PADDLE_THICKNESS){

                hitSound.play();
                ballBounceOffPaddle++;
                changeBallSpeedAndDirection();

                //point where the center of the paddle is located
                var centerPaddle1 = (paddle1Y + PADDLE_HEIGHT/2);
                //ball distance from center of paddle on collision
                var centerDistance1 = ballY - centerPaddle1;
                ballSpeedY = centerDistance1 * 0.35;
            }
              
        }

        if(ballX < 0) {
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