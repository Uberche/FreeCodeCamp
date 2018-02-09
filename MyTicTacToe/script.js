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

let running = 1;
let level = 0;
let win = 0;
let loss = 0;
let human = "X";
let computer = "O";
let cellArr = document.querySelectorAll(".cell");

resetGame(); 
document.querySelector("#win").innerText = win;
document.querySelector("#loss").innerText = loss;

document.querySelector("#dropdownmenu").addEventListener('click', changeLevel, false);
document.querySelector("#reset").addEventListener('click', resetGame, false);

function changeLevel() {
  level = dropdownmenu.value;
}

function resetGame() {
  running = 1;
  document.querySelector('#status').innerText = "New Game";
  boardState = Array.from(Array(9).keys());
  for(let i = 0; i<cellArr.length; i++) {
    cellArr[i].innerText = "";
    cellArr[i].style.backgroundColor = "white";
    cellArr[i].addEventListener('click', turn, false);
    
  }
}

function turn(clickedCell) {
  if (document.querySelector('#status').innerText != "On Going") {
    document.querySelector('#status').innerText = "On Going";
  }
  if(typeof boardState[clickedCell.target.id] == 'number') {
    turnPl(human, boardState[clickedCell.target.id]);
    if(!checkTie(boardState) && running == 1) {
      turnPl(computer, compChoice());
    } else if (checkTie(boardState) && running == 1) {
      document.querySelector('#status').innerText = "It's a tie!";
      for(let i = 0; i < cellArr.length; i++) {
        cellArr[i].removeEventListener('click', turn, false);
        document.getElementById(parseInt(cellArr[i].id)).style.backgroundColor = "yellow";
      }
    }
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
      
    case "1":
      miniMax(boardState, computer, 0);
      break;
    case "2":
      miniMax(boardState, computer, 0);
      break;
    default: 
      return emptySq(boardState)[0];
  }
}

function miniMax(board, player, depth) {
  let openCells = emptySq(boardState); 
  
  if (checkWin(human,board)) {
    return {hypScore: depth - 10};
  } else if (checkWin(computer,board)) {
    return {hypScore: 10 - depth};
  } else if (checkTie(board)) {
    return {hypScore: 0};
  }
  console.log(board + " | " + player + " | " + depth);
  let moves = [];
  for (let i = 0; i < openCells.length; i++) {
    let thisMove = {};
    thisMove.index = board[openCells[i]];
    board[openCells[i]] = player;
    console.log(openCells);
    if (player == human) {
      let newScore = miniMax(board, computer, depth += 1);
      thisMove.hypScore = newScore.hypScore;
    } else {
      let newScore = miniMax(board, human, depth += 1);
      thisMove.hypScore = newScore.hypScore;
    }
  
    board[openCells[i]] = thisMove.index;

    moves.push(thisMove);
  }
  
  let bestMove;
  if (player = computer) {
    let bestScore = -100;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].hypScore > bestMove) {
        bestScore = moves[i].hypScore;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 100;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].hypScore < bestMove) {
        bestScore = moves[i].hypScore;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

function emptySq(board) {
  return board.filter(s => typeof s == 'number' ); 
}

function checkTie(board) {
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
  running = 0;
  document.querySelector("#status").innerText = gameWon.winPl + " has won!";
  for(let i = 0; i < cellArr.length; i++) {
    cellArr[i].removeEventListener('click', turn, false);
    if (winState[gameWon.winInd].indexOf(parseInt(cellArr[i].id)) >= 0) {
      if (gameWon.winPl == "X") {
        document.getElementById(parseInt(cellArr[i].id)).style.backgroundColor = "blue";
      } else {
        document.getElementById(parseInt(cellArr[i].id)).style.backgroundColor = "red";
      }
    }
  }
  if (gameWon.winPl == "X") {
    win++;
    document.querySelector("#win").innerText = win;
  } else {
    loss++; 
    document.querySelector("#loss").innerText = loss;    
  }
}
