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
}

// Fisher-Yates (array) shuffling algorithm
const shuffleBoard = array => {
    let currentIndex = boardSize * boardSize;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex--);
        const currentRow = Math.floor(currentIndex / boardSize);
        const currentColumn = currentIndex % boardSize;
        const randomRow = Math.floor(randomIndex / boardSize);
        const randomColumn = randomIndex % boardSize;
        const temp = array[currentRow][currentColumn];
        array[currentRow][currentColumn] = array[randomRow][randomColumn];
        array[randomRow][randomColumn] = temp;
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

let colorTheme;
const setColorTheme = (theme) => {
    // [correct, empty, incorrect]
    if (theme == 1) colorTheme = ["#fff", "#858585", "#c4c4c4"];
}

// Colors cells to indicate correctness
const colorBoard = () => {
    for (let i = 0; i < boardSize; ++i) {
        let cells = rows[i].getElementsByTagName("td");
        for (let j = 0; j < boardSize; ++j) {
            if (boardArray[i][j] != 0 && boardArray[i][j] == solution[i][j]) {
                cells[j].style.backgroundColor = colorTheme[0];
            }
            else if (boardArray[i][j] == 0) {
                cells[j].style.backgroundColor = colorTheme[1]; 
            }
            else { 
                cells[j].style.backgroundColor = colorTheme[2]; 
            }         
        }
    }
}

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
            if (boardArray[i][j] != solution[i][j]) { return; }
        }
    }
    
    // stopTimer();
    // stopTrackingAPM();

    moveLock = true;
}