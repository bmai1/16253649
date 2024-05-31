// Define game boards (and answer board to check if solved)

let b4x4 = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];
let a4x4 = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,0]];

let b5x5 = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,0]];
let a5x5 = [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,0]];

let b6x6 = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24],[25,26,27,28,29,30],[31,32,33,34,35,0]];
let a6x6 = [[1,2,3,4,5,6],[7,8,9,10,11,12],[13,14,15,16,17,18],[19,20,21,22,23,24],[25,26,27,28,29,30],[31,32,33,34,35,0]];

let b7x7 = [[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21],[22,23,24,25,26,27,28],[29,30,31,32,33,34,35],[36,37,38,39,40,41,42],[43,44,45,46,47,48,0]];
let a7x7 = [[1,2,3,4,5,6,7],[8,9,10,11,12,13,14],[15,16,17,18,19,20,21],[22,23,24,25,26,27,28],[29,30,31,32,33,34,35],[36,37,38,39,40,41,42],[43,44,45,46,47,48,0]];

let empty = [-1, -1]; // location [row, col] of empty cell

let moveCount = 0;


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

// Fisher-Yates (array) shuffling algorithm
const shuffleBoard = array => {
    let currentIndex = boardSize * boardSize;
    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        const currentRow = Math.floor(currentIndex / boardSize);
        const currentColumn = currentIndex % boardSize;
        const randomRow = Math.floor(randomIndex / boardSize);
        const randomColumn = randomIndex % boardSize;
        const temp = array[currentRow][currentColumn];
        array[currentRow][currentColumn] = array[randomRow][randomColumn];
        array[randomRow][randomColumn] = temp;
    }
}