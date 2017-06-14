function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect(), root = document.documentElement;

    //account for the margins, canvas position on page, scroll amount, etc.
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.left - root.scrollTop;
    return{
        x: mouseX, 
        y: mouseY
    };
}



function mousemoveHandler(evt){
    var mousePos = calculateMousePos(evt);
    paddleX = mousePos.x - (PADDLE_WIDTH/2);
    if(ballSuspended === true){
        ballX = (paddleX + (PADDLE_WIDTH/2)) + 10;
    }
}

function mouseupHandler(evt){
    if(showTitleScreen === false){
        ballSuspended = false;
    }
    showTitleScreen = false;
    
}

function initInput(){
    canvas.addEventListener("mousemove", mousemoveHandler);
    canvas.addEventListener("click", mouseupHandler);  
}