$(document).ready(function(){
	var canvas;
	var convasContext;
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
    	carInit();
		initInput();
	}

	function drawEverything(){
		//game board
		drawTracks();

		//draw car
		carDraw();	

	}

	function moveEverything(){
		carMove();
	}

	
		
