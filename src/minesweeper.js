/**
 * Prints the board
 * @param {board} board 
 */
const printBoard = (board) => {
  console.log('Current board:');

  console.log(board.map((row) => {
    return row.join(' | ');
  }).join('\n'));
};

/* 
Generates a board with # or rows/columns
returns the created board;
*/
const generatePlayerBoard = (rows, cols) => {
  
  if(!rows || !cols){
    console.log('generateBoard: invalid args');
    return;
  }

  let board = [];

  for(let i = 0; i < rows; i++){
    let row = [];
    for(let j = 0; j < cols; j++){
      row.push(' ');
    }
    board.push(row);
  }

  return board;
}

/**
 * populates a board with mines
 * @param {*} board 
 */
const generateBombBoard = (row, col, numOfBombs) => {
  // If no rows/columns
  if(!row || !col){
    console.log('generateBoard: invalid args');
    return;
  }

  let board = [];
  let nRow;
  for(let i = 0; i < row; i++){
    nRow = [];
    for(let j = 0; j < col; j++){
      nRow.push(null);
    }
    board.push(nRow);
  }
  
  // Case: no bomb # passed, or # of bombs exceeds number of spaces
  if(!numOfBombs || numOfBombs >= (row * col)){
    console.log('populateBombs: invalid bombs');
    return 0;
  }

  let bombCounter = 0;
  // Need to replace variables
  let numRows = row;
  let numCols = col;

  while (bombCounter < numOfBombs){
    let rowIndex = Math.floor(Math.random() * (numRows));
    let colIndex = Math.floor(Math.random() * (numCols));
    
    // Checks to see if a bomb is already placed
    // in the target square.
    if(board[rowIndex][colIndex]){
      //Right Space
      if(colIndex + 1 < numCols && !board[rowIndex][colIndex + 1]){
        board[rowIndex][colIndex + 1] = 'B';
      } //Upper space
      else if (rowIndex - 1 >= 0 && !board[rowIndex - 1][colIndex]){
        board[rowIndex - 1][colIndex] = 'B';
      } // Down space 
      else if(rowIndex + 1 < numRows && !board[rowIndex + 1][colIndex + 1]){
        board[rowIndex + 1][colIndex] = 'B';
      } //Left Space 
      else if(colIndex - 1 >= 0 && !board[rowIndex][colIndex - 1]){
        board[rowIndex][colIndex - 1] = 'B';
      } else {
        // worst case scenario
        let assigned = false;
        while(!assigned){
          rowIndex = Math.floor(Math.random() * (numRows));
          colIndex = Math.floor(Math.random() * (numCols));
          if(!board[rowIndex][colIndex]){
            board[rowIndex][colIndex] = 'B'
            assigned = true;
          }
        }
      }
    } else { 
      board[rowIndex][colIndex] = 'B';
    }
    bombCounter++;
  }
  return board;
};


const mineBoard = generateBombBoard(3, 3, 7);
printBoard(mineBoard);

const playerBoard = generatePlayerBoard(3, 3);
printBoard(playerBoard);