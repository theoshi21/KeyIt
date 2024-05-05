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
    return Math.floor((Math.random() * 6)+3);
}

function starAppear(){
    document.getElementById("object").style.display = "block";
}

//Makes the object appear on random places with random size.
function objectRandomizer(){
    let width = objectSize()
    object.style.width = width+"%";
    object.style.height =  (width*2)+"%"; 
    object.style.top = XPos()+"px";
    object.style.left = YPos()+"px";
}

//Function for when the object is clicked
function objectClick(){
    alert("pindotted");
    objectRandomizer();
}
//---END OF MOUSE CATEGORY CODE
