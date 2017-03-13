$(document).ready(function(){
	var ballX = 75;
	var ballY = 75;
	var ballSpeedX = 6;
	var ballSpeedY = 6;
	var framesPerSecond = 30;
	var paddleX = 350;
	var canvas;
	var convasContext;
	const PADDLE_WIDTH = 100;
	const PADDLE_HEIGHT = 10;


	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	setInterval(function(){
		drawEverything(); 
		moveEverything();
    }, 1000/framesPerSecond);

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

	function drawEverything(){
		//game board
		colorRect(0, 0, canvas.width, canvas.height, "black");

		//paddle
		colorRect(paddleX, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT, "white");

		//draw ball
		colorCircle(ballX, ballY, 10, "white");	
	}

	function moveEverything(){
		//bounce ball off wall
		if(ballX > canvas.width || ballX < 0){
			ballSpeedX *= -1;
		}

		if(ballY < 0){
			ballSpeedY *= -1;
		}

		//moves ball horizontally
		ballX += ballSpeedX;

		//moves ball vertically
		ballY += ballSpeedY;
	}

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

	$(canvas).mousemove(function(evt){
		var mousePos = calculateMousePos(evt);
		paddleX = mousePos.x - (PADDLE_WIDTH/2);
	});
});
