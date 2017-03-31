var p1 = new carClass();
var p2 = new carClass();
var canvas;
var convasContext;

$(document).ready(function(){

	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	//fully loads images before starting program	
	loadImages();
});


	function loadingDoneSoStartGame(){
		var framesPerSecond = 30;
		setInterval(function(){
			drawEverything(); 
			moveEverything();
    	}, 1000/framesPerSecond);
    	p2.carInit(car2Pic, "Green Car");
    	p1.carInit(carPic, "Blue Car");
		initInput();
	}

	function drawEverything(){
		//game board
		drawTracks();

		//draw cars
		p1.carDraw();
		p2.carDraw();	

	}

	function moveEverything(){
		//moves cares
		p1.carMove();
		p2.carMove();
	}

	
		
