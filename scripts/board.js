// Define game boards (and Solution board to check if solved)
let board = null;
let boardArray = null;
let solution = null;

// Game board elements
const board4x4 = document.getElementById("board-4x4");
const board5x5 = document.getElementById("board-5x5");
const board6x6 = document.getElementById("board-6x6");
const board7x7 = document.getElementById("board-7x7");

let b4x4 = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
let s4x4 = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];

let b5x5 = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,0]];
let s5x5 = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,0]];

let b6x6 = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24],[25,26,27,28,29,30],[31,32,33,34,35,0]];
let s6x6 = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24],[25,26,27,28,29,30],[31,32,33,34,35,0]];

let b7x7 = [[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21],[22,23,24,25,26,27,28],[29,30,31,32,33,34,35],[36,37,38,39,40,41,42],[43,44,45,46,47,48,0]];
let s7x7 = [[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21],[22,23,24,25,26,27,28],[29,30,31,32,33,34,35],[36,37,38,39,40,41,42],[43,44,45,46,47,48,0]];

let empty = [-1, -1]; // location [row, col] of empty cell

let moveLock;
let moveCount;
let timerRunningFlag = false;

// Handle keyboard input
window.onkeydown = e => {
    if (moveLock) return;

    if ((e.key == "ArrowUp" || e.key == "w") && empty[0] != boardSize - 1) { editBoard("up"); }
    else if ((e.key == "ArrowDown" || e.key == "s") && empty[0] != 0) { editBoard("down"); }
    else if ((e.key == "ArrowLeft" || e.key == "a") && empty[1] != boardSize - 1) { editBoard("left"); }
    else if ((e.key == "ArrowRight" || e.key == "d") && empty[1] != 0) { editBoard("right"); }
    else return; 

    // if (!timerRunningFlag) {
    //    startTimer(); 
    //    startTrackingAPM();
    //    timerRunningFlag = true;
    // }

    ++moveCount;
    renderBoard();
    colorBoard();
    checkSolved();
}

const newGame = (startBoard) => {
    setBoard(startBoard);
    setColorTheme(1);
    
    do { shuffleBoard(boardArray); }
    while (!solvable(boardArray.flat()));

    moveLock = false;
    moveCount = 0;
    // timerElement.innerText = "00:00:000";
    // moveCounter.innerText = "Moves: 0";

    renderBoard();
    colorBoard();
}