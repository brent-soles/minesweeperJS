const blankLine = ' | | ';
const guessLine = '1| | ';
const bombLine = ' |B| ';

const mineField = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];


const printBoard = (board) => {
  console.log('Current board:');
  for(let i = 0; i < board.length; i++){
    console.log(board[i].join(' | '));
  }
};


printBoard(mineField);

mineField[0][1] = '1';
mineField[2][2] = 'B';

printBoard(mineField);

// console.log('Empty minesweeper board:');
// for(let i = 0; i < 3; i++){
//   console.log(blankLine);
// }

// console.log("");
// console.log('Filled minesweeper board:');
// console.log(guessLine);
// console.log(bombLine);
// console.log(blankLine);
