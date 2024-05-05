//--- FOR STARTING GAME
var startTime, currentTime, endTime, running = true;

function startMercy(){
    startTimer();
    document.getElementById("btnContainer").style.display = "none";
    randomCategory();    
}

function randomCategory(){
    let game = random(3,1)
    switch(game){
        case 1: mouseGame(); break;
        case 2: mouseGame(); break; //should be typing
        case 3: mouseGame(); break; //should be arrow
    }
}

var timer;
function startTimer(){
    startTime = new Date()
    timer = setInterval(() => {
        currentTime = getTimerTime(startTime)
        document.getElementById("scoreDisp").innerHTML = "Score: "+currentTime.toString().padStart(4,"0");
        console.log(currentTime);
    }, 1000)
}

function getTimerTime(startTime){
    return Math.floor((new Date() - startTime) / 1000 )
}

function random(max, min){
    return Math.floor((Math.random() * max)+min);
}

//Ending the game
function endGame(){
    running = false;
    endTime = currentTime;
    clearInterval(timer);
    alert("Game ended, your score was "+endTime);
}

//--- END OF STARTING GAME


//---FOR MOUSE CATEGORY
var gameBodyWidth = document.getElementById("gameBody").offsetWidth;
var gameBodyHeight = document.getElementById("gameBody").offsetHeight
var object = document.getElementById("object");
var score = 0;

//Randomizes Y position of Object within the Div
function YPos(){
    return Math.floor(Math.random()* (gameBodyWidth-object.offsetWidth))
}

//Randomizes X position of Object within the Div
function XPos(){
    return Math.floor(Math.random()* (gameBodyHeight-object.offsetWidth))
}

//Randomizes object size between 3% to 6%;
function objectSize(){
    return Math.floor((Math.random() * 5)+2);
}

function mouseGame(){
    document.getElementById("object").innerHTML = "<div id='starImg' onclick='objectClick()'> </div>";
    objectRandomizer();
}

let objectTimer;
//Makes the object appear on random places with random size.
function objectRandomizer(){
    if(running){
        object.style.display = "block";
        objectTimer = setTimeout(objectDisappear, 3000);
        let width = objectSize()
        object.style.width = width+"%";
        object.style.height =  (width*2)+"%"; 
        object.style.top = XPos()+"px";
        object.style.left = YPos()+"px";
    }

}

function objectDisappear(){
    if(!objectTimer) return;
    object.style.display = "none";
    alert("u suck u didn't click me")
    endGame();
}

//Function for when the object is clicked
function objectClick(){
    clearTimeout(objectTimer);
    objectTimer = null;
    object.style.display = "none";
    randomCategory();
}
//--- END OF MOUSE CATEGORY CODE
