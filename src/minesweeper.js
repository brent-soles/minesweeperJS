const blankLine = ' | | ';
const guessLine = '1| | ';
const bombLine = ' |B| ';

console.log('Empty minesweeper board:');
for(let i = 0; i < 3; i++){
  console.log(blankLine);
}

console.log("");
console.log('Filled minesweeper board:');
console.log(guessLine);
console.log(bombLine);
console.log(blankLine);
