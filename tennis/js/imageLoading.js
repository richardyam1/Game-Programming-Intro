	var picsToLoad = 0;

	var player1Paddle = document.createElement("img");

	var player2Paddle = document.createElement("img");

	var backgroundPic = document.createElement("img");

	var ballPic = document.createElement("img");
		

	function countLoadedImageAndLaunchIfReady(){
		picsToLoad--;
		if(picsToLoad === 0){
			loadingDoneSoStartGame();
		}
	}

	function loadImages(){
		//document.getElementById("gameCanvas").style.backgroundImage = "url('images/bg.png')";
		
		var imageList = [
			{varName: player1Paddle, theFile: "paddleLeft.png"},
			{varName: player2Paddle, theFile: "paddleRight.png"},
			{varName: backgroundPic, theFile: "bg.png"},
			{varName: ballPic, theFile: "ball.png"}
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

	