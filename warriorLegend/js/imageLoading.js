	var picsToLoad = 0;
	var playerPic = document.createElement("img");
	var trackPics = [];
	

	function countLoadedImageAndLaunchIfReady(){
		picsToLoad--;
		if(picsToLoad === 0){
			loadingDoneSoStartGame();
		}
	}

	function loadImages(){
		var imageList = [
			{varName: playerPic, theFile: "warrior.png"},
			{trackType: TRACK_ROAD, theFile: "world_ground.png"},
			{trackType: TRACK_WALL, theFile: "world_wall.png"},
			{trackType: TRACK_GOAL, theFile: "world_goal.png"},
			{trackType: TRACK_TREE, theFile: "world_key.png"},
			{trackType: TRACK_FLAG, theFile: "world_door.png"}
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
