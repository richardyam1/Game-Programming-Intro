var picsToLoad = 0;
var carPic = document.createElement("img");
var car2Pic = document.createElement("img");
//will contain all track tile images
var trackPics = [];


function countLoadedImageAndLaunchIfReady(){
	picsToLoad--;
	if(picsToLoad === 0){
		loadingDoneSoStartGame();
	}
}

function loadImages(){
	var imageList = [
		{varName: carPic, theFile: "player1.png"},
		{varName: car2Pic, theFile: "player2.png"},
		{trackType: TRACK_ROAD, theFile: "track_road.png"},
		{trackType: TRACK_WALL, theFile: "track_wall.png"},
		{trackType: TRACK_GOAL, theFile: "track_goal.png"},
		{trackType: TRACK_TREE, theFile: "track_tree.png"},
		{trackType: TRACK_FLAG, theFile: "track_flag.png"},
		{trackType: TRACK_GRASS, theFile: "track_grass.png"},
		{trackType: TRACK_OIL, theFile: "track_oil.png"}
	];

	picsToLoad = imageList.length;

	for(var i = 0; i < imageList.length; i++){
		if(imageList[i].trackType != undefined){
			loadImageForTrackCode(imageList[i].trackType, imageList[i].theFile);
		}
		else{
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
	}
	
}

function beginLoadingImage(imgVar, fileName){
	//picsToLoad++;
	imgVar.onload = countLoadedImageAndLaunchIfReady;
	imgVar.src = "images/" + fileName;
}

function loadImageForTrackCode(trackCode, fileName){
	trackPics[trackCode] = document.createElement("img");
	beginLoadingImage(trackPics[trackCode], fileName);
}
