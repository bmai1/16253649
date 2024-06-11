// Handle moves, called by editBoard() in board_utility.js
function move() {
    if (!timerRunningFlag) {
        startTimer(); 
        timerRunningFlag = true;
        pauseEnabled = true;
    }
 
    ++moveCount; 
    ++totalMoveCount; 
    moveCounter.innerHTML = moveCount;
    totalMoveCounter.innerHTML = totalMoveCount;

    renderBoard();
    colorBoard();
    checkSolved();
}

// Handle keyboard input
function keyboardMove(e) {
    if (moveLock) return;
    if ((e.key == "ArrowUp" || e.key == "w") && empty[0] != boardSize - 1) editBoard("up");
    else if ((e.key == "ArrowDown" || e.key == "s") && empty[0] != 0) editBoard("down");
    else if ((e.key == "ArrowLeft" || e.key == "a") && empty[1] != boardSize - 1) editBoard("left");
    else if ((e.key == "ArrowRight" || e.key == "d") && empty[1] != 0) editBoard("right");
}
window.onkeydown = e => keyboardMove(e);

// Handle click input
function clickMove(e) {
    if (moveLock) return;
    let clickedCell = e.target;
    if (clickedCell.tagName === "TD" && clickedCell.innerText != "") {
        for (let i = 0; i < boardSize; ++i) {
            for (let j = 0; j < boardSize; ++j) {
                // double equals for comparison of int and string
                if (boardArray[i][j] == clickedCell.innerText) {
                    if (i == empty[0]) {
                        if (j - 1 == empty[1]) editBoard("left");
                        if (j + 1 == empty[1]) editBoard("right");
                    }
                    if (j == empty[1]) {
                        if (i - 1 == empty[0]) editBoard("up");
                        if (i + 1 == empty[0]) editBoard("down");
                    }
                }
            }
        }
    }
}
document.querySelectorAll('table').forEach(table => {
    table.addEventListener('click', clickMove);
});