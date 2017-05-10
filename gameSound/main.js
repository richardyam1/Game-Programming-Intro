var someSound, altSound;
var canvas, canvasContext;
var backgroundMusic = new BackgroundMusicClass();
var longerSound = new SoundOverlapsClass("victory");
var shorterSound = new SoundOverlapsClass("bloop");

function mouseupHandler(){
	backgroundMusic.startOrStopMusic();
}

function keyPressed(evt){
	backgroundMusic.loopSong("victory");
	evt.preventDefault();
}


window.onload = function(){
	
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");
	canvas = document.getElementById("gameCanvas");
	canvas.addEventListener("mouseup", mouseupHandler);
	document.addEventListener("keydown", keyPressed);
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);
	backgroundMusic.loopSong("victory");
};
