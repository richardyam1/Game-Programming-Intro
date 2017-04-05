var p1 = new shipClass();
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
    	p1.init(playerPic, "Blue Car");
		initInput();
	}

	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");

		//draw cars
		p1.draw();

	}

	function moveEverything(){
		//moves cares
		p1.move();
	}

	
		
