//--- FOR STARTING GAME
var startTime, currentTime, endTime, running = true;
var lives = 3;

function startMercy(){
    updateLife();
    startTimer();
    document.getElementById("btnContainer").style.display = "none";
    randomCategory();    
}

function updateLife(){
    var disp = "Lives: ";
    for(var i = 0; i < lives; i++){
        disp += '<img src="heart.png" alt="life" class="heart"></img>'
    }
    document.getElementById('life').innerHTML = disp;
}

function randomCategory(){
    console.log("Life is "+lives)
    if(lives > 0){
        let game = random(3,1)
        switch(game){
        case 1: mouseGame(); break;
        case 2: typingGame(); break; //should be typing
        case 3: arrowGame(); break; //should be arrow
        }
    }
    else {
        console.log("dapat tapos nako dito")
        endGame();
        document.getElementById("btnContainer").style.display = "flex";
        document.getElementById("playBtn").style.display = "none";
        document.getElementById("restartBtn").style.display = "flex";
        document.getElementById("typingContainer").style.display = "none";
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


//---FUNCTIONS FOR BUTTONS
function restartGame(){
    startTime = null, currentTime = null, endTime = null, running = true;
    lives = 3;
    document.getElementById("playBtn").style.display = "flex";
    document.getElementById("restartBtn").style.display = "none";
}

//---END OF FUNCTIONS FOR BUTTONS

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
        objectTimer = setTimeout(objectDisappear, 2000); //Responsible for the how long the object appears.
        let width = objectSize()
        object.style.width = width+"%";
        object.style.height =  (width*2)+"%"; 
        object.style.top = XPos()+"px";
        object.style.left = YPos()+"px";
    }

}

function objectDisappear(){
    if(!objectTimer) return;
    lives--;
    updateLife();
    object.style.display = "none";
    alert("u suck u didn't click me")
    randomCategory();
}

//Function for when the object is clicked
function objectClick(){
    clearTimeout(objectTimer);
    objectTimer = null;
    object.style.display = "none";
    randomCategory();
}
//--- END OF MOUSE CATEGORY CODE

//--- TYPING CATEGORY
function typingGame() {
    document.getElementById("typingContainer").style.display = "flex";
    let words = [
        "pear", "fig", "lime", "kiwi", "plum", 
        "lion", "mango", "apple", "grape", "cold", 
        "wolf", "peach", "cat", "bird", "frog", 
        "dog", "fish", "panda", "tiger", "zebra", 
        "bear", "snake", "horse", "mouse", "ocean",
        "tree", "cloud", "trail", "earth", "moon",
        "star", "sun", "rain", "snow", "wind",
        "fire", "rock", "gold", "coin", "ring",
        "cake", "book", "pen", "door", "key",
        "ship", "fish", "bird", "frog", "moon"
    ]; //50 WORDS (3-5 LETTERS) CAN ADD MORE IF NEEDED

    let currentWordIndex = Math.floor(Math.random() * words.length);
    let currentWord = words[currentWordIndex];
    let wordDisplay = document.getElementById("wordDisp");
    wordDisplay.textContent = currentWord;
    
    createInput();

    let typedWord = '';
    let wordArray = currentWord.split('');
    let typingTimer = setTimeout(() => {
        lives--;
        updateLife();
        removeInput();
        clearTyping();
        randomCategory();
    }, 2000);
    
    document.getElementById("userInput").addEventListener("input", function(event) {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
            lives--;
            updateLife();
            clearTyping();
            clearTimeout(typingTimer);
            randomCategory();
        }, 2000);

        let input = event.target.value.trim();
        let typedChar = input.charAt(input.length - 1);
        
        if (currentWord.startsWith(typedWord + typedChar)) {
            typedWord += typedChar;

            let displayHTML = '';
            for (let i = 0; i < wordArray.length; i++) {
                if (i < typedWord.length) {
                    if (typedWord.charAt(i) === wordArray[i]) {
                        displayHTML += `<span style="color: green">${typedWord.charAt(i)}</span>`;
                    } else {
                        displayHTML += `<span style="color: red">${typedWord.charAt(i)}</span>`;
                    }
                } else {
                    displayHTML += wordArray[i];
                }
            }
            wordDisplay.innerHTML = displayHTML;

            if (typedWord === currentWord) {
                console.log('correct');
                wordDisplay.textContent = currentWord;
                clearTyping();
                clearTimeout(typingTimer);
                randomCategory();
            }
        } else {
            lives--;
            updateLife();
            clearTyping();
            clearTimeout(typingTimer);
            alert('failed typing game');
            randomCategory();
        }
    });
}

function createInput() {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "userInput");
    input.setAttribute("autofocus", "autofocus");
    document.getElementById("typingContainer").appendChild(input);
    input.focus();
}

function clearTyping(){
    let wordDisplay = document.getElementById("wordDisp");
    removeInput();
    wordDisplay.innerHTML = "";
}

function removeInput() {
    var input = document.getElementById("userInput");
    if (input) {
        input.parentNode.removeChild(input);
    }
}
//--- END OF TYPING CATEGORY

//--- ARROW CATEGORY
const arrowKeys = [
    { key: 'ArrowLeft', image: '<img src="leftArrow.png" alt="leftArrow" class="arrowImage">' },
    { key: 'ArrowDown', image: '<img src="downArrow.png" alt="downArrow" class="arrowImage">' },
    { key: 'ArrowUp', image: '<img src="upArrow.png" alt="upArrow" class="arrowImage">' },
    { key: 'ArrowRight', image: '<img src="rightArrow.png" alt="rightArrow" class="arrowImage">' }
];
function arrowGame(){
    var arrowElement = document.getElementById("arrow"); //sa object ko kasi didisplay
    var arrowDisplayed = Math.floor(Math.random() * 4); // 0-3 lang 'to
    arrowElement.innerHTML = arrowKeys[arrowDisplayed].image;
    document.addEventListener('keydown', handleKeyPress);
}

var sequence = 4;
function handleKeyPress(event) {
    var pressedKey = event.key;
    // Find the arrow currently displayed by comparing its image with the content of the 'object' element
    let arrowDisplayed = null;
    for (let i = 0; i < arrowKeys.length; i++) {
        if (arrowKeys[i].image === document.getElementById('arrow').innerHTML) {
            arrowDisplayed = arrowKeys[i];
            break; // Once found, exit the loop
        }
    }
    // Check if an arrow is displayed and if the pressed key matches its key
    if (arrowDisplayed && pressedKey === arrowDisplayed.key) {
       if(sequence > 0){
        sequence--;
        removeArrow();
        arrowGame();
       }
       else {
        sequence = 4;
        removeArrow();
        document.removeEventListener('keydown', handleKeyPress);
        randomCategory();
        }
       
    } else {
        lives--;
        updateLife();
        removeArrow();
        document.removeEventListener('keydown', handleKeyPress);
        randomCategory();
    }
}

function removeArrow() {
    const arrowElement = document.getElementById('arrow');
    arrowElement.innerHTML = ''; // Remove the displayed arrow
}

//--- END OF ARROW CATEGORY