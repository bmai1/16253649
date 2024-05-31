document.addEventListener("DOMContentLoaded", function() {
    // Menu Buttons
    const startButton = document.getElementById("start-button");
    const rulesButton = document.getElementById("rules-button");

    const backToMenuButtons = document.getElementsByClassName("back-to-menu-button");

    const button4x4 = document.getElementById("button-4x4");
    const button5x5 = document.getElementById("button-5x5");
    const button6x6 = document.getElementById("button-6x6");
    const button7x7 = document.getElementById("button-7x7");

    // Menu Containers
    const welcomeContainer = document.getElementById("welcome-container");
    const selectBoardContainer = document.getElementById("select-board-container");
    const howToPlayContainer = document.getElementById("how-to-play-container");

    // Game boards
    const board4x4 = document.getElementById("board-4x4");
    const board5x5 = document.getElementById("board-5x5");
    const board6x6 = document.getElementById("board-6x6");
    const board7x47= document.getElementById("board-7x7");


    // Menu button events
    startButton.addEventListener("click", function() {
        welcomeContainer.style.display = "none";
        selectBoardContainer.style.display = "block";
    });

    rulesButton.addEventListener("click", function() {
        welcomeContainer.style.display = "none";
        howToPlayContainer.style.display = "block";
    });

    for (let i = 0; i < backToMenuButtons.length; ++i) {
        backToMenuButtons[i].addEventListener("click", function() {
            clearContainers();
            welcomeContainer.style.display = "block";
        });
    }

    button4x4.addEventListener("click", function() {
        selectBoardContainer.style.display = "none";
        board4x4.style.display = "block";
    });
});

function clearContainers() {
    const elements = document.body.children;
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].tagName.toLowerCase() !== 'footer') {
            elements[i].style.display = 'none';
        }
    }
}