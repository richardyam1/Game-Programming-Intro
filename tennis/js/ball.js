var ballX = 75;
var ballY = 75;
var ballSpeedX = 10;
//randomize diagonal
var ballSpeedY = Math.floor(Math.random() * 4) + 5;
var ballBounceOffPaddle = 0;
var direction;
var ballTrailLength = 10;
var ballPosition = [];
var bounced = false;
const MIN_BALL_SPEED = 10;
const MID_BALL_SPEED = 14;
const MAX_BALL_SPEED = 18;

function ballReset(){
    //checks if the maximum score is reached
    if(leftScore >= winScore || rightScore >=winScore){
        showingMenuScreen = true;
    }

    //changes direction of the ball when ball is served
    //reflect ball to right if going left
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
    ballSpeedY = Math.floor(Math.random() * 4) + 5;
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

    //changes speed of the ball when it bounces a certain amount of times
    if(ballBounceOffPaddle === 4){ 
        ballSpeedX = MID_BALL_SPEED * direction;        
    }

    if (ballBounceOffPaddle === 12){
        ballSpeedX = MAX_BALL_SPEED * direction;
    }

    ballSpeedX = -ballSpeedX;
}

function ballMove(){
    //bounce off paddle if going left.  ballSpeedX is negative when going left
    if(ballSpeedX < 0){
        if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT){
            if(ballX > DIST_FROM_EDGE && ballX < DIST_FROM_EDGE + PADDLE_THICKNESS){
                hitSound.play();
                ballBounceOffPaddle++;
                changeBallSpeedAndDirection();
                calculateDestinationAfterReflection()
                bounced = true;
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

    //bounce off paddle if going right
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
    


    //redirects ball when it hits ceiling or floor
    if(ballY > canvas.height || ballY < 0) {
        ballSpeedY *= -1;
    }
    //stores position of the ball
    storeLastPosition(ballX, ballY);
    if(bounced){
        calculateDestinationAfterReflection();
    }

    //Moves ball horizontally
    ballX += ballSpeedX;

    //Moves ball Vertically
    ballY += ballSpeedY;

    
}

function storeLastPosition(xPos, yPos){
    ballPosition.push({
        x: xPos,
        y: yPos
    });
    //removes left most element in array
    if(ballPosition.length > ballTrailLength){
        ballPosition.shift();
    }
}

function ballDraw(){
    //Insert Tennis ball image 
    drawBitmapCenteredAtLocation(ballPic, ballX, ballY);
}

function trailDraw(){
    //draws out trail behind the ball that gets smaller
    for(var i = 0; i < ballPosition.length; i++){
        var ratio = (i + 1)/ ballPosition.length;
        canvasContext.beginPath();
        //draw circle that gets smaller behind ball to produce trailing effect
        canvasContext.arc(ballPosition[i].x, ballPosition[i].y, ballPic.width/((ballPosition.length-i) + 2), 0, 2 * Math.PI, true);
        canvasContext.fillStyle = "rgba(204, 102, 153, " + ratio / 2 + ")";
        canvasContext.fill();
    }
}

function calculateDestinationAfterReflection(){
    var slope = calculateSlope(ballPosition[0].x, ballPosition[0].y, ballPosition[ballTrailLength - 1].x, ballPosition[ballTrailLength - 1].y);
    var distanceToPaddle2 = (canvas.width - player2Paddle.width - DIST_FROM_EDGE) - ballX;
    var ballYFinalPoint = distanceToPaddle2 * slope * direction;
    bounced = false;
    document.getElementById("debugText").innerHTML=ballYFinalPoint;
    /*if(ballYFinalPoint < 0 || ballYFinalPoint > canvas.height){
        
    }*/
}

function calculateSlope(x1, y1, x2, y2){
    return (y2 - y1)/ (x2 - x1);
}





/*Slope
    ballSpeedY(2) - ballspeedY(1)
    ______________________________
    ballSpeedX(2) - ballSpeedX(1)

    ballPosition.y[ballPosition.length - 1] - ballPosition.y[0]
    ______________________________
    ballPosition.x[ballPosition.length - 1] - ballPosition.x[0]

    

    Use slope and ball current position to determine where paddle intercept
    Every 1 step right ball goes up/down a certain amount

    distance from ball to paddle area= (canvas.width - player2Paddle.width - DIST_FROM_EDGE) - ballX  

    ballY intercept = ball to paddle * slope;
    if ballY intercept < 0 or ballY intercept > canvas.height{
        paddle2y does not move
    }
    when ball contact wall or ceiling{
        ballY intercept = ball to paddle * slope
        paddle2Y moves to intercept 
    }
*/