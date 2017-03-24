	var picsToLoad = 0;
	var carPic = document.createElement("img");
	var trackPicRoad = document.createElement("img");
	var trackPicWall = document.createElement("img");
	var trackPicGoal = document.createElement("img");
	var trackPicTree = document.createElement("img");
	var trackPicFlag = document.createElement("img");

	function countLoadedImageAndLaunchIfReady(){
		picsToLoad--;
		if(picsToLoad === 0){
			loadingDoneSoStartGame();
		}
	}

	function loadImages(){
		var imageList = [
			{varName: carPic, theFile: "player1.png"},
			{varName: trackPicRoad, theFile: "track_road.png"},
			{varName: trackPicWall, theFile: "track_wall.png"},
			{varName: trackPicGoal, theFile: "track_goal.png"},
			{varName: trackPicTree, theFile: "track_tree.png"},
			{varName: trackPicFlag, theFile: "track_flag.png"}
		];

		picsToLoad = imageList.length;

		for(var i = 0; i < imageList.length; i++){
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
		
	}

	function beginLoadingImage(imgVar, fileName){
		//picsToLoad++;
		imgVar.onload = countLoadedImageAndLaunchIfReady;
		imgVar.src = "images/" + fileName;
	}
