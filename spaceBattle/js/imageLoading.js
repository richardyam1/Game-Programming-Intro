	var picsToLoad = 0;
	var playerPic = document.createElement("img");
	var ufoPic = document.createElement("img");
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
			{varName: playerPic, theFile: "player1.png"},
			{varName: ufoPic, theFile: "ufo.png"}
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
