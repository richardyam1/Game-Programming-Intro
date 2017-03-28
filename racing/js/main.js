var p1 = new carClass();
var p2 = new carClass();
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
    	p1.carInit();
    	p2.carInit();
		initInput();
	}

	function drawEverything(){
		//game board
		drawTracks();

		//draw car
		p1.carDraw();
		p2.carDraw();	

	}

	function moveEverything(){
		p1.carMove();
		p2.carMove();
	}

	
		
