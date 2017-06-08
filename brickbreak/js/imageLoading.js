	var picsToLoad = 0;
	var paddlePic = document.createElement("img");
	var lifePic = document.createElement("img");
	var brickPic = document.createElement("img");
	var backgroundPic = document.createElement("img");
	var ballPic = document.createElement("img");
		

	function countLoadedImageAndLaunchIfReady(){
		picsToLoad--;
		if(picsToLoad === 0){
			loadingDoneSoStartGame();
		}
	}

	function loadImages(){
		var imageList = [
			{varName: paddlePic, theFile: "paddle.png"},
			{varName: brickPic, theFile: "brick.png"},
			{varName: lifePic, theFile: "life.png"},
			{varName: backgroundPic, theFile: "bg.png"},
			{varName: ballPic, theFile: "ball.png"}
		];

		picsToLoad = imageList.length;

		for(var i = 0; i < imageList.length; i++){			
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);	
		}
		
	}

	function beginLoadingImage(imgVar, fileName){
		imgVar.onload = countLoadedImageAndLaunchIfReady;
		imgVar.src = "images/" + fileName;
	}

	