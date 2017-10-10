var startTime;
var timeStarted;

function checkTime(time){
	if(time < 10){
		time = "0" + time;
	}
	return time;
}

function startTime(){
	startTime = new Date();

	timeStarted = setInterval(runTime, 10);
}


function runTime(){
	var currentTime = new Date();
	var timeElapsed = new Date(currentTime - startTime);
	var min = timeElapsed.getMinutes();
	var sec = timeElapsed.getSeconds();
	var ms = timeElapsed .getMilliseconds(); 
	min = checkTime(min);
	sec = checkTime(sec);

	console.log(min + ":" + sec);
}