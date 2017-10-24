var p1 = new carClass();
var p2 = new carClass();
var canvas;
var canvasContext;
var stopWatch;
var stopWatchContext;
var currentTime = 0;
var raceStarted = false;
var cpuCar = false;
var cpuCarMoving = false;
var backgroundMusic = new BackgroundMusicClass();
var carEngine = new SoundOverlapsClass("audio/carEngine");
var carBrake = new SoundOverlapsClass("audio/carBrake");
var carCollision = new SoundOverlapsClass("audio/carCollision");
var carJump = new SoundOverlapsClass("audio/carJump");
startTime();


$(document).ready(function(){
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	stopWatch = document.getElementById("stopWatch");
	stopWatchContext = canvas.getContext("2d");
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
	if(raceStarted === false){
		colorText("Press the 1 Key to change the time of day", canvas.width/2 - 100, canvas.height/2, "white");
	}

}

function moveEverything(){
	carEngine.play();
	//moves cares
	p1.carMove();
	p2.carMove();	
	if(cpuCar === true && cpuCarMoving === false){
		cpuCarMove(p2);
		cpuCarMoving = true;
	}
	detectCollision(p1, p2);
}


		
