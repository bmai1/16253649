const setBoard = currBoard => {
    boardArray = currBoard;
    boardSize = boardArray.length;
    switch (boardSize) {
        case 4:
            board = board4x4;
            solution = s4x4;
            break;
        case 5:
            board = board5x5;
            solution = s5x5;
            break;
        case 6:
            board = board6x6;
            solution = s6x6;
            break;
        case 7:
            board = board7x7;
            solution = s7x7;
            break;
    }
    rows = board.getElementsByTagName("tr");
    board.style.display = "block";
}

let shuffleLimit; // ADJUST DIFFICULT WITH SHUFFLE LIMIT

// Fisher-Yates (array) shuffling algorithm for 2d array
const shuffleBoard = array => {
    let currentIndex = boardSize * boardSize;
    let count = 0;

    // bigger boards take too long
    if (boardSize == 4) shuffleLimit = 16;
    if (boardSize == 5) shuffleLimit = 4;
    if (boardSize == 6) shuffleLimit = 2;
    if (boardSize == 7) shuffleLimit = 1;

    while (currentIndex !== 0) {
        if (++count > shuffleLimit) break;
        let randomIndex = Math.floor(Math.random() * currentIndex--);
        let currentRow = Math.floor(currentIndex / boardSize);
        let currentColumn = currentIndex % boardSize;
        let randomRow = Math.floor(randomIndex / boardSize);
        let randomColumn = randomIndex % boardSize;
        let temp = array[currentRow][currentColumn];
        array[currentRow][currentColumn] = array[randomRow][randomColumn];
        array[randomRow][randomColumn] = temp;
    }
}

// Durstenfeld shuffle to randomize boards left
const shuffleRemaining = () => {
    for (var i = boardsRemaining.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = boardsRemaining[i];
        boardsRemaining[i] = boardsRemaining[j];
        boardsRemaining[j] = temp;
    }
}

// Updates board HTML
const renderBoard = () => {
    for (let i = 0; i < boardSize; ++i) {
        let cells = rows[i].getElementsByTagName("td");
        for (let j = 0; j < boardSize; ++j) {
            if (boardArray[i][j] == 0) {
                cells[j].innerText = '';
                empty[0] = i, empty[1] = j;
            }
            else { cells[j].innerText = boardArray[i][j]; }
        }
    }
}

// Updates board array based on input move
const editBoard = (direction) => {
    let row = empty[0], col = empty[1];
    if (direction == "up") {
        boardArray[row][col] = boardArray[row + 1][col];
        boardArray[row + 1][col] = 0; 
        ++empty[0];
    }
    else if (direction == "down") {
        boardArray[row][col] = boardArray[row - 1][col];
        boardArray[row - 1][col] = 0; 
        --empty[0];
    }
    else if (direction == "left") {
        boardArray[row][col] = boardArray[row][col + 1];
        boardArray[row][col + 1] = 0; 
        ++empty[1];
    }
    else if (direction == "right") { 
        boardArray[row][col] = boardArray[row][col - 1];
        boardArray[row][col - 1] = 0; 
        --empty[1];
    }
}

const incrementMoveCount = () => {
    ++moveCount; 
    ++totalMoveCount; 
    moveCounter.innerHTML = moveCount;
    totalMoveCounter.innerHTML = totalMoveCount;
}

let colorThemes = [
    // [correct, incorrect, empty]
    ["#ffffff", "#ffffff", "#ffffff"], // 0. clean
    ["#ffffff", "#bbbbbb", "#444444"], // 1. slate
    ["#ffffff", "#000000", "#444444"], // 2. blindfold
    ["#ffbadb", "#ffbadb", "#ffffff"], // 3. sakura
    ["#ffbadb", "#9ebffa", "#ffffff"], // 4. sakura blues
    ["#ffeda6", "#9ebffa", "#ffffff"], // 5. sunny / blue lemonade
    ["#ffeda6", "#ffb37a", "#ffffff"], // 6. heatwave
]
let colorTheme = ["#ffffff", "#bbbbbb", "#444444"]; // default as slate
const setColorTheme = (theme) => {
    colorTheme = colorThemes[theme];
}

// Colors cells to indicate correctness
const colorBoard = () => {
    for (let i = 0; i < boardSize; ++i) {
        let cells = rows[i].getElementsByTagName("td");
        for (let j = 0; j < boardSize; ++j) {
            // correct
            if (boardArray[i][j] != 0 && boardArray[i][j] == solution[i][j]) {
                cells[j].style.backgroundColor = colorTheme[0];
            }
            // empty
            else if (boardArray[i][j] == 0) {
                cells[j].style.backgroundColor = colorTheme[2]; 
            }
            // incorrect
            else { 
                cells[j].style.backgroundColor = colorTheme[1]; 
            }         
        }
    }
}

// Hide navigational buttons and controls on main interface
const navButtons = document.getElementById("nav-buttons");
const controls = document.getElementById("controls");
let hiddenControls = false;
let hideButtonClicked = false;

const zen = () => {
    if (!hiddenControls) {
        navButtons.style.opacity = 0;
        controls.style.opacity = 0;
        controls.style.pointerEvents = "none";
        hiddenControls = true;
        hideButtonClicked = true;
    } 
    else {
        navButtons.style.opacity = 1;
        controls.style.opacity = 1;
        controls.style.pointerEvents = "auto";
        hiddenControls = false;
    }
}

document.body.addEventListener('click', function(event) {
    if (hiddenControls && !hideButtonClicked) {
        navButtons.style.opacity = 1;
        controls.style.opacity = 1;
        hiddenControls = false;
    }
    hideButtonClicked = false; 
});


// (Shubham Singh) https://github.com/imshubhamsingh/15-puzzle/commit/e016ad30a9560d2450618a99e9e5b218123f50ae#diff-8478a7bac0240dc851826c916a23b44e3e318bf3e480424aea77d533e1d770fe
const solvable = puzzle => {
    let parity = 0;
    let gridWidth = boardSize;
    let row = 0;
    let blankRow = 0;
    for (let i = 0; i < puzzle.length; i++) {
        if (i % gridWidth == 0) ++row;
        if (puzzle[i] == 0) {
            blankRow = row;
            continue;
        }
        for (var j = i + 1; j < puzzle.length; j++) {
            if (puzzle[i] > puzzle[j] && puzzle[j] != 0) ++parity;
        }
    }
    if (gridWidth % 2 == 0) {
        if (blankRow % 2 == 0) return parity % 2 == 0;
        else return parity % 2 != 0;
    } 
    else return parity % 2 == 0;
};

const checkSolved = () => {
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            if (boardArray[i][j] != solution[i][j]) return; 
        }
    }

    stopTimer();
    // parse milliseconds from HTML string to remember time for next board
    totalTimeOffset = totalTime.innerHTML.split(':').reduce((acc, val, idx) => acc + parseInt(val) * [60000, 1000, 1][idx], 0);
    // console.log(totalTimeOffset);

    timerRunningFlag = false;
    pauseEnabled = false;
    moveLock = true;
    if (boardsSolved == boardsRemaining.length) {
        console.log("You win");
    }
    else {
        nextButton.style.display = "";
    }
}

const checkCorrect = () => {
    let correct = 0;
    for (let i = 0; i < boardSize; ++i) {
        for (let j = 0; j < boardSize; ++j) {
            if (boardArray[i][j] == solution[i][j]) ++correct;
        }
    }
    return correct;
}

const nextButton = document.getElementById("next-button");
const nextBoard = () => {
    nextButton.style.display = "none";
    newGame(boardsRemaining[boardsSolved]);
    ++boardsSolved;
}
