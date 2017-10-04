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
	var imageList = [];
	var imageListSet = [[
		{varName: carPic, theFile: "player1_day.png"},
		{varName: car2Pic, theFile: "player2_day.png"},
		{trackType: TRACK_ROAD, theFile: "track_road_day.png"},
		{trackType: TRACK_WALL, theFile: "track_wall_day.png"},
		{trackType: TRACK_GOAL, theFile: "track_goal_day.png"},
		{trackType: TRACK_TREE, theFile: "track_tree_day.png"},
		{trackType: TRACK_FLAG, theFile: "track_flag_day.png"},
		{trackType: TRACK_GRASS, theFile: "track_grass_day.png"},
		{trackType: TRACK_OIL, theFile: "track_oil_day.png"}],
		
		[{varName: carPic, theFile: "player1_night.png"},
		{varName: car2Pic, theFile: "player2_night.png"},
		{trackType: TRACK_ROAD, theFile: "track_road_night.png"},
		{trackType: TRACK_WALL, theFile: "track_wall_night.png"},
		{trackType: TRACK_GOAL, theFile: "track_goal_night.png"},
		{trackType: TRACK_TREE, theFile: "track_tree_night.png"},
		{trackType: TRACK_FLAG, theFile: "track_flag_night.png"},
		{trackType: TRACK_GRASS, theFile: "track_grass_night.png"},
		{trackType: TRACK_OIL, theFile: "track_oil_night.png"}]
	];
	imageList = imageListSet[currentTime]; 
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
