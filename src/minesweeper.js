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


/**
 * Returns number of bombs that are adjacent to a certain tile
 */

const getNumberOfNeighborBombs = (rowIndex, colIndex, board) => {
  // Base case
  if(board[rowIndex][colIndex] === undefined){
    console.log('getNumberOfNeighborBombs: undefined index');
    return null;
  }

  // Hard code ftw
  const neighborOffsets = [
    [-1, 0],  // Above
    [-1, 1],  // Above right
    [0, 1],   // right
    [1, 1],   // bottom right
    [1, 0],   // bottom
    [1, -1],  // bottom left
    [0, -1],  // left
    [-1, -1]  // above left
  ];
  const numOfRows = board.length;
  const numOfCols = board[0].length;
  let adjacentBombs = 0;

  neighborOffsets.forEach( (offset) => {
    let rowOffset = rowIndex + offset[0];
    let colOffset = colIndex + offset[1];
    
    // Check to see if offset is inbounds
    if( (rowOffset) < numOfRows && (rowOffset) >= 0 && (colOffset) < numOfCols && (colOffset) >= 0){
      let currentTile = board[rowOffset][colOffset];
      if(currentTile === 'B'){      
        adjacentBombs++;
      }
    }
  });

  return adjacentBombs;
}

/**
 * Function for player to flip a tile
 */
const flipTile = (playerBoard, bombBoard, rowIndex, colIndex) => {
  //Base case
  if(playerBoard[rowIndex][colIndex] === undefined){
    console.log("flipTile: out of bounds");
    return null;
  }

  // Space has a bomb in it 
  if (bombBoard[rowIndex][colIndex] === 'B'){
    playerBoard[rowIndex][colIndex] = 'B';
    console.log("GAME OVER: You stepped on a mine");

  } // Space has not been set
  else if(playerBoard[rowIndex][colIndex] === ' ') {
    playerBoard[rowIndex][colIndex] = getNumberOfNeighborBombs(rowIndex, colIndex, bombBoard);
  } // Space has already been played 
  else {
    console.log('You already flipped that tile');
  }

};

// Function testing

const mineBoard = generateBombBoard(3, 3, 3);
printBoard(mineBoard);

console.log(getNumberOfNeighborBombs(1, 1, mineBoard));

const playerBoard = generatePlayerBoard(3, 3);
printBoard(playerBoard);

flipTile(playerBoard, mineBoard, 0, 0);
printBoard(playerBoard);

flipTile(playerBoard, mineBoard, 0, 0);
printBoard(playerBoard);