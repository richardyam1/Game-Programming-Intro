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

    function mousemoveHandler(evt){
        var mousePos = calculateMousePos(evt);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    }

    function mousedownHandler(){
        if (showingWinScreen){
            leftScore = 0;
            rightScore = 0;
            showingWinScreen = false;
        }
    }