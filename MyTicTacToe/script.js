let boardState; 
let winState = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,4,8],
  [2,4,6],
  [0,3,6],
  [1,4,7],
  [2,5,8]
]

let level = 0;

let human = "X";
let computer = "O";
let cellArr = document.querySelectorAll(".cell");

resetGame(); 

document.querySelector("#reset").addEventListener('click', resetGame, false);

function resetGame() {
  boardState = Array.from(Array(9).keys());
  for(let i = 0; i<cellArr.length; i++) {
    cellArr[i].innerText = "";
    cellArr[i].style.backgroundColor = "white";
    cellArr[i].addEventListener('click', turn, false);
  }
}

function turn(clickedCell) {
  if(typeof boardState[clickedCell.target.id] == 'number') {
    turnPl(human, boardState[clickedCell.target.id]);
    if(!checkTie()) turnPl(computer, compChoice());
  }
}

function turnPl(player, cell) { 
  boardState[cell] = player;
  document.getElementById(cell).innerText = player;
  let gameWon = checkWin(player, boardState);
  if (gameWon) gameOver(gameWon);
}

function compChoice() {
  switch (level) {
      
    case 0:
      return emptySq()[0];
      break;
  }
}

function emptySq() {
  return boardState.filter(s => typeof s == 'number' ); 
}

function checkTie() {
  for (let i = 0; i<boardState.length; i ++) {
    if (typeof boardState[i] == 'number') {
      return false;
    }
  }
  return true;
}

function checkWin(player, board) {
  let playWin = board.reduce((a,b,c) =>(b===player) ? a.concat(c) : a, []);
  let gameWon = null;
  for (let [index, win] of winState.entries()){
    if (win.every(num => playWin.indexOf(num) > -1)) {
      gameWon = {winPl: player, winInd: index};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon) {
  document.querySelector("#status").innerText = gameWon.winPl + " has won!";
  for(let i = 0; i<cellArr.length; i++) {
    cellArr[i].removeEventListener('click', turn, false);
    if (winState[gameWon.winInd].indexOf(parseInt(cellArr[i].id) >= 0)) {
      console.log("thisone");
      // cellArr[i].style.backgroundColor = "blue";
    }
  }
}
