const time = document.getElementById("time");
const totalTime = document.getElementById("total-time");
let startTime, endTime, elapsedTime, timerInterval;

const startTimer = () => {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 10); // Update timer every 10 milliseconds
}

const stopTimer = () => {
    clearInterval(timerInterval);
}

let totalTimeOffset = 0;

const updateTimer = () => {
    endTime = new Date().getTime();
    elapsedTime = endTime - startTime;
  
    let minutes = Math.floor(elapsedTime / 60000);
    let seconds = Math.floor((elapsedTime % 60000) / 1000);
    let milliseconds = elapsedTime % 1000;
  
    let timerDisplay = String(minutes).padStart(2, '0') + ':' +
                       String(seconds).padStart(2, '0') + ':' +
                       String(Math.floor(milliseconds / 10)).padStart(2, '0');
  
    time.innerHTML = timerDisplay;

    // total time
    let totalElapsedTime = endTime - startTime + totalTimeOffset;
    minutes = Math.floor(totalElapsedTime / 60000);
    seconds = Math.floor((totalElapsedTime % 60000) / 1000);
    milliseconds = totalElapsedTime % 1000;
    timerDisplay = String(minutes).padStart(2, '0') + ':' +
                   String(seconds).padStart(2, '0') + ':' +
                   String(Math.floor(milliseconds / 10)).padStart(2, '0');

    totalTime.innerHTML = timerDisplay;
}

// Pause timer
const pauseButton = document.getElementById("pause-button")
let paused = false;
let pauseEnabled = false; 
const pause = () => {
    if (!pauseEnabled) return;

    if (paused) {
        pauseButton.innerText = "Pause";
        pauseButton.style.backgroundColor = "";
        moveLock = false;

        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);

        paused = false;
    }
    else { 
        pauseButton.innerText = "Resume";
        pauseButton.style.backgroundColor = "#f0f0f0";
        moveLock = true;

        stopTimer();
        elapsedTime = Date.now() - startTime;

        paused = true;
    }
}