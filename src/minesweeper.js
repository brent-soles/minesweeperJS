const blankLine = ' | | ';
const guessLine = '1| | ';
const bombLine = ' |B| ';

const playerField = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

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
const populateBombs = (mineField) => {
  
  if(!mineField){
    console.log('populateBombs: empty array passed');
    return 0;
  }
  
  mineField.forEach((mineRow) => {
    let index = Math.floor(Math.random() * (mineRow.rows));
    mineRow[index] = 'B';
  });

};

const mineBoard = generateBoard(3, 3);
populateBombs(mineBoard);
printBoard(mineBoard);

const playerBoard = generateBoard(3, 3);
printBoard(playerBoard);