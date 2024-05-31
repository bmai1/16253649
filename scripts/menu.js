document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const rulesButton = document.getElementById("rules-button");
    const welcomeContainer = document.getElementById("welcome-container");
    const selectBoardContainer = document.getElementById("select-board-container");
    const howToPlayContainer = document.getElementById("how-to-play-container");

    // Handle menu buttons
    startButton.addEventListener("click", function() {
        welcomeContainer.style.display = "none";
        selectBoardContainer.style.display = "block";
    });

    rulesButton.addEventListener("click", function() {
        welcomeContainer.style.display = "none";
        howToPlayContainer.style.display = "block";
    });

    const backToMenuButtons = document.getElementsByClassName("back-to-menu-button");
    for (let i = 0; i < backToMenuButtons.length; ++i) {
        backToMenuButtons[i].addEventListener("click", function() {
            selectBoardContainer.style.display = "none";
            howToPlayContainer.style.display = "none";
            welcomeContainer.style.display = "block";
        });
    }
});