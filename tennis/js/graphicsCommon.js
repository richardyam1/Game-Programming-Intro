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

    function drawBitmapCenteredAtLocation(graphic, graphicPositionX, graphicPositionY){
        canvasContext.save();
        canvasContext.translate(graphicPositionX, graphicPositionY);
        canvasContext.drawImage(graphic, graphic.width/2, graphic.height/2); //center, draw
        canvasContext.restore();
    }