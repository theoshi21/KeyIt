function start(){
    document.getElementById("startButton").style.display = "none";
    document.getElementById("gameButton").style.display = "block";
}

function mercy(){
    window.location.href = "mercy/mercy.html";
}

function endless(){
    window.location.href = "endless/endless.html";
}

const audioElement = document.getElementById("myAudio"); // Use audioElement

function playAudio() {
  audioElement.play();
}

function pauseAudio() {
  audioElement.pause();
}



const playButton = document.getElementById('start');

playButton.addEventListener(
'click', () => {
  if (audioElement.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
});

