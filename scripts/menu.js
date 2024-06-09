// Menu Buttons
const startButton = document.getElementById("start-button");
const themesButton = document.getElementById("themes-button")
const rulesButton = document.getElementById("rules-button");

const backToMenuButtons = document.getElementsByClassName("back-to-menu-button");

const button4x4 = document.getElementById("button-4x4");
const button5x5 = document.getElementById("button-5x5");
const button6x6 = document.getElementById("button-6x6");
const button7x7 = document.getElementById("button-7x7");

// Menu Containers
const welcomeContainer = document.getElementById("welcome-container");
const selectBoardContainer = document.getElementById("select-board-container");
const themesContainer = document.getElementById("themes-container");
const howToPlayContainer = document.getElementById("how-to-play-container");

const footer = document.getElementById("footer");

// Menu button events
startButton.addEventListener("click", function() {
    clearContainers();
    selectBoardContainer.style.display = "block";
});

themesButton.addEventListener("click", function() {
    clearContainers();
    themesContainer.style.display = "block"; 
});

rulesButton.addEventListener("click", function() {
    clearContainers();
    footer.style.opacity = 0;
    howToPlayContainer.style.display = "block";
});

for (let i = 0; i < backToMenuButtons.length; ++i) {
    backToMenuButtons[i].addEventListener("click", function() {
        stopTimer();
        timerRunningFlag = false;
        totalTimeOffset = 0;
        totalMoveCount = 0;
        totalTime.innerText = "00:00:00";
        totalMoveCounter.innerText = "0";
        if (paused) pause();
        pauseEnabled = false;

        nextButton.style.display = "none"; // In case current board is solved

        clearContainers();
        mainInterface.classList = "";
        selectBoardContainer.classList = "container";

        footer.style.opacity = 1;
        welcomeContainer.style.display = "block";
    });
}

// Select starting board
button4x4.addEventListener("click", function() {
    clearContainers();
    newGame(b4x4);
    slideInterface();
    boardsSolved = 0;
    boardsRemaining = [b5x5, b6x6, b7x7];
    this.blur(); // remove focus from button to prevent spacebar shuffle
});

button5x5.addEventListener("click", function() {
    clearContainers();
    newGame(b5x5);
    slideInterface();
    boardsSolved = 0;
    boardsRemaining = [b4x4, b6x6, b7x7];
    this.blur();
});

button6x6.addEventListener("click", function() {
    clearContainers();
    newGame(b6x6);
    slideInterface();
    boardsSolved = 0;
    boardsRemaining = [b4x4, b5x5, b7x7];
    this.blur();
});

button7x7.addEventListener("click", function() {
    clearContainers();
    newGame(b7x7);
    slideInterface();
    boardsSolved = 0;
    boardsRemaining = [b4x4, b5x5, b6x6];
    this.blur();
});

const clearContainers = () => {
    const elements = document.body.children;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName.toLowerCase() !== 'footer') {
            elements[i].style.display = 'none';
        }
    }
}

const slideInterface = () => {
    // Timeout for scroll transition to play
    // CSS: must be position fixed, transition on top/bottom
    selectBoardContainer.style.display = "block";
    selectBoardContainer.classList = "container";
    setTimeout(() => {
        selectBoardContainer.classList.add('hidden');
        
    }, 5);

    mainInterface.classList = "";
    mainInterface.style.display = "block";
    // If the show class is added executes before display is set to block, then the transition won't play.
    setTimeout(() => {
        mainInterface.classList.add("show");
    }, 20);
}