var picsToLoad = 0;
var paddlePic = document.createElement("img");
var lifePic = document.createElement("img");

var greyBrickPic = document.createElement("img");
var greenBrickPic = document.createElement("img");
var redBrickPic = document.createElement("img");
var yellowBrickPic = document.createElement("img");

var powerFirePic = document.createElement("img");
var powerCannonPic = document.createElement("img");
var powerMultiPic = document.createElement("img");
var powerStickyPic = document.createElement("img");
var powerPointsPic = document.createElement("img");

var cannonPic =  document.createElement("img");
var laserPic = document.createElement("img");

var backgroundPic = document.createElement("img");
var ballPic = document.createElement("img");
var brickPics = [];

function countLoadedImageAndLaunchIfReady(){
	picsToLoad--;
	if(picsToLoad === 0){
		loadingDoneSoStartGame();
	}
}

function loadImages(){
	var imageList = [
		{varName: paddlePic, theFile: "paddle.png"},
		{varName: lifePic, theFile: "life.png"},
		{varName: backgroundPic, theFile: "bg.jpg"},
		{varName: ballPic, theFile: "ball.png"},
		{varName: greyBrickPic, theFile: "brick1.png"},
		{varName: greenBrickPic, theFile: "brick2.png"},
		{varName: redBrickPic, theFile: "brick3.png"},
		{varName: yellowBrickPic, theFile: "brick4.png"},
		{varName: powerFirePic, theFile: "powerFire.png"},
		{varName: powerCannonPic, theFile: "powerCannon.png"},
		{varName: powerMultiPic, theFile: "powerMulti.png"},
		{varName: powerStickyPic, theFile: "powerSticky.png"},
		{varName: powerPointsPic, theFile: "powerPoints.png"},
		{varName: cannonPic, theFile: "cannon.png"},
		{varName: laserPic, theFile: "laser.png"}

	];

	picsToLoad = imageList.length;

	for(var i = 0; i < imageList.length; i++){	
		if(imageList[i].brickType !== undefined){
			loadImageForBrickCode(imageList[i].brickType, imageList[i].theFile);
		}		

		else {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);	
		}
	}
	
}

function beginLoadingImage(imgVar, fileName){
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForBrickCode(brickCode, fileName){
	brickPics[brickCode] = document.createElement("img");
	beginLoadingImage(brickPics[brickCode], fileName);
}

