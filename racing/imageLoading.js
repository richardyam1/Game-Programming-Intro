	var picsToLoad = 0;
	var carPic = document.createElement("img");
	var trackPicRoad = document.createElement("img");
	var trackPicWall = document.createElement("img");


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
			{varName: trackPicWall, theFile: "track_wall.png"}
		];

		picsToLoad = imageList.length;

		for(var i = 0; i < imageList.length; i++){
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		}
		
	}

	function beginLoadingImage(imgVar, fileName){
		//picsToLoad++;
		imgVar.onload = countLoadedImageAndLaunchIfReady;
		imgVar.src = fileName;
	}
