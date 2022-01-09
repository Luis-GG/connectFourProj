/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const WIDTH = 7;
const HEIGHT = 6;


let currPlayer = 1;



// active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array
    for (let i = 0; i < HEIGHT; i++) {
        board.push([null, null, null, null, null, null, null])
    }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.getElementById("board");

    // TODO: add comment for this code
    //creating top table row
    let top = document.createElement("tr");
    //giving top table row a id of column-top
    top.setAttribute("id", "column-top");
    // adding a click event to the top table row
    top.addEventListener("click", handleClick);
    // creating td cells 
    for (let x = 0; x < WIDTH; x++) {
        let headCell = document.createElement("td");

        // setting an id to new td cell
        headCell.setAttribute("id", x);
        headCell.classList.add("cTop");
        //appending new td cell to top table row
        top.append(headCell);
    }
    htmlBoard.append(top);

    // TODO: add comment for this code
    for (let y = 0; y < HEIGHT; y++) {
        //creating new table row 
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            //creating new table data cell
            const cell = document.createElement("td");
            // setting id attribute for new table data cell
            cell.setAttribute("id", `${y}-${x}`);
            //appending new cell to new table row
            row.append(cell);
        }
        //appending row to htmlBoard
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    let targetCol = [];
    for (let i = 0; i < HEIGHT; i++) {
        targetCol.push(document.getElementById(`${i}-${x}`));
    }

    for (let i = 5; i >= 0; i--) {
        if ((document.getElementById(`${i}-${x}`)).childNodes.length === 0) {
            return i;
        }
    }

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
    const targTd = document.getElementById(`${y}-${x}`);
    const newDiv = document.createElement("div");

    board[`${y}`][`${x}`] = currPlayer;

    newDiv.classList.add("piece");
    newDiv.classList.add(`player${currPlayer}`);

    targTd.append(newDiv);

}

/** endGame: announce game end */

function endGame(msg) {
    alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // get x from ID of clicked cell
    let x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    let y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    placeInTable(y, x);

    // check for win
    if (checkForWin()) {
        document.querySelector("body").style.pointerEvents = "none";
        setTimeout(() => { return endGame(`Player ${currPlayer} won!`); }, 100)
        // return endGame(`Player ${currPlayer} won!`);

    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    const allPieces = document.getElementsByClassName("piece");
    if (allPieces.length === (WIDTH * HEIGHT)) {
        return endGame("Tie!")
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2
    if (currPlayer === 1) {
        currPlayer++;
    } else {
        currPlayer--;
    }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer
        //if all tests below pass, return true. else return false
        return cells.every(
            ([y, x]) =>
                y >= 0 &&
                y < HEIGHT &&
                x >= 0 &&
                x < WIDTH &&
                board[y][x] === currPlayer
        );
    }

    // TODO: read and understand this code. Add comments to help you.
    // loop through rows
    for (var y = 0; y < HEIGHT; y++) {
        //loop through cells in rows
        for (var x = 0; x < WIDTH; x++) {
            // checking for horizontal win
            var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
            // checking for vertical win
            var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
            //checking for diagnal win on right side
            var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
            //checking for diganl win on left side
            var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
            // checkForWin() will be ran on all four, and if any of the four are true, return true

            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}



makeBoard();
makeHtmlBoard();




