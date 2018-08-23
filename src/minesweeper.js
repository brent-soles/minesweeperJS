/* 
Generates a board with # or rows/columns
returns the created board;
*/
const generateBoard = (rows, cols) => {
  
  if(!rows || !cols){
    console.log('generateBoard: invalid args');
    return;
  }

  let resultBoard = [];

  for(let i = 0; i < rows; i++){
    resultBoard.push([]);
    for(let j = 0; j < cols; j++){
      resultBoard[i].push(' ');
    }
  }

  return resultBoard;
}

/**
 * Prints the board
 * @param {board} board 
 */
const printBoard = (board) => {
  console.log('Current board:');
  for(let i = 0; i < board.length; i++){
    console.log(board[i].join(' | '));
  }
};

/**
 * populates a board with mines
 * @param {*} mineField 
 */
const populateBombs = (mineField, numOfBombs) => {
  
  // If no minefield passed.
  if(!mineField){
    console.log('populateBombs: empty array passed');
    return 0;
  }
  
  // Case: no bomb # passed, or # of bombs exceeds number of spaces
  if(!numOfBombs || numOfBombs >= (mineField.length * mineField[0].length)){
    console.log('populateBombs: invalid bombs');
    return 0;
  }

  let bombCounter = 0;
  let numRows = mineField.length;
  let numCols = mineField[0].length;

  while (bombCounter < numOfBombs){
    let rowIndex = Math.floor(Math.random() * (numRows));
    let colIndex = Math.floor(Math.random() * (numCols));
    
    // Checks to see if a bomb is already placed
    // in the target square.
    if(mineField[rowIndex][colIndex] === 'B'){
      //Right Space
      if(colIndex + 1 < numCols && mineField[rowIndex][colIndex + 1] === ' '){
        mineField[rowIndex][colIndex + 1] = 'B';
      } //Upper space
      else if (rowIndex - 1 >= 0 && mineField[rowIndex - 1][colIndex] === ' '){
        mineField[rowIndex - 1][colIndex] = 'B';
      } // Down space 
      else if(rowIndex + 1 < numRows && mineField[rowIndex + 1][colIndex + 1] === ' '){
        mineField[rowIndex + 1][colIndex] = 'B';
      } //Left Space 
      else if(colIndex - 1 >= 0 && mineField[rowIndex][colIndex - 1] === ' '){
        mineField[rowIndex][colIndex - 1] = 'B';
      } else {
        //console.log('No assign: paniccccc');
        let assigned = false;
        while(!assigned){
          rowIndex = Math.floor(Math.random() * (numRows));
          colIndex = Math.floor(Math.random() * (numCols));
          if(mineField[rowIndex][colIndex] !== 'B'){
            mineField[rowIndex][colIndex] = 'B'
            assigned = true;
          }
        }
      }
    } else { 
      mineField[rowIndex][colIndex] = 'B';
    }
    bombCounter++;
  }

};


const mineBoard = generateBoard(3, 3);
populateBombs(mineBoard, 8);
printBoard(mineBoard);

const playerBoard = generateBoard(3, 3);
printBoard(playerBoard);