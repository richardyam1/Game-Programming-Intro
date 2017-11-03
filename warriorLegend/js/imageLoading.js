	var picsToLoad = 0;
	var playerPicRight = document.createElement("img");
	var playerPicDown = document.createElement("img");
	var playerPicLeft = document.createElement("img");
	var playerPicUp = document.createElement("img");

	var tilePics = [];
	

	function countLoadedImageAndLaunchIfReady(){
		picsToLoad--;
		if(picsToLoad === 0){
			loadingDoneSoStartGame();
		}
	}

	function loadImages(){
		var imageList = [
			{varName: playerPicRight, theFile: "warrior_right.png"},
			{varName: playerPicDown, theFile: "warrior_down.png"},
			{varName: playerPicLeft, theFile: "warrior_left.png"},
			{varName: playerPicUp, theFile: "warrior_up.png"},

			
			{tileType: TILE_GROUND, theFile: "world_ground.png"},
			{tileType: TILE_WALL, theFile: "world_wall.png"},
			{tileType: TILE_GOAL, theFile: "world_goal.png"},
			{tileType: TILE_KEY, theFile: "world_key.png"},
			{tileType: TILE_DOOR, theFile: "world_door.png"}
		];

		picsToLoad = imageList.length;

		for(var i = 0; i < imageList.length; i++){
			if(imageList[i].tileType != undefined){
				loadImageForTileCode(imageList[i].tileType, imageList[i].theFile);
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

	function loadImageForTileCode(tileCode, fileName){
		tilePics[tileCode] = document.createElement("img");
		beginLoadingImage(tilePics[tileCode], fileName);
	}
