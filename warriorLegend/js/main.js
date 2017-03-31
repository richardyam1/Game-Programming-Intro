var p1 = new class();
var canvas;
var convasContext;

$(document).ready(function(){

	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	
	loadImages();
});


	function loadingDoneSoStartGame(){
		var framesPerSecond = 30;
		setInterval(function(){
			drawEverything(); 
			moveEverything();
    	}, 1000/framesPerSecond);
    	p1.init(playerPic, "Blue Car");
		initInput();
	}

	function drawEverything(){
		//game board
		drawTracks();

		//draw car
		p1.draw();

	}

	function moveEverything(){
		p1.move();
	}

	
		
