"use strict";

const wrongAudio = new Audio('http://ethanstrauss.com/images/wrong.mp3');
const buttons = document.querySelectorAll('.key');
let useStrict = false;
let pattern = [];
let humanArray;
let whoseTurn = "cpu";
let gameOn;
let click = 0;

document.getElementById('strict').addEventListener('click', () => {
  (useStrict == false) ? useStrict=true : useStrict=false;
  $('#strictlight').toggleClass('greenlight');
});

function button(id,name,brightColor,darkColor,audio){
  this.id = id;
  this.name = name;
  this.color = darkColor;
  this.brightColor = brightColor;
  this.audio = new Audio(audio);
  this.highlight = function (good) {
    let id = this.id;
    let oldColor = this.color;
    if (good) {
      this.audio.play();  
      console.log('good');    
    } else {
      wrongAudio.play(); 
      console.log('bad');
    }
    document.getElementById(name).style.backgroundColor = this.brightColor;
    setTimeout(function() {
      document.getElementById(name).style.backgroundColor = oldColor;      
    }, 500);
  }
}

let buttonArray = [
  new button(0,"key1","#0000ff", "#0000ba",'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  new button(1,"key2","#ff0000", "#ba0000",'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  new button(2,"key3","#ffff00", "#baba00",'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  new button(3,"key4","#00ff00", "#00ba00",'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
]

function extendPattern() {
  pattern.push(buttonArray[Math.floor(Math.random() * 4)]);
}

function showPattern() {
  let p=1;
  for(let i=0; i<pattern.length; i++) {
    window.setTimeout(function() {
      let tBut = buttonArray[pattern[i].id];
      tBut.highlight(true);
    }, 800*p);
    p++;
  }
}

function addRemove(what) {
  if (what == "remove") {
    buttons.forEach((x) => {
      x.style.cursor = "auto";
      x.removeEventListener('click', clickButton);
    });
  } else {
    buttons.forEach((x) => {
      x.style.cursor = "pointer";
      x.addEventListener('click', clickButton);
    });
  }
}

function turn() {
  if (whoseTurn == "cpu" && gameOn == true) {
    addRemove("remove");
    extendPattern();
    showPattern();
    whoseTurn = "human";
    turn();
  } else if (whoseTurn = "human" && gameOn== true) {
    click = 0;
    humanArray = [];
    humanTurn();
  }
}

function humanTurn() {
  addRemove("add");
}
// just check once. var X = 0++ everytime. is the latest the same as the corresponding? 
function clickButton(e) {
  click++;
  for(let i=0; i<buttonArray.length; i++) {
    if (buttonArray[i].name == e.target.id){
      let tBut = buttonArray[i];

      // IS IT RIGHT
      if (tBut == pattern[click-1]){
        tBut.highlight(true);
      } else {
        tBut.highlight(false);
        if (useStrict) {
          gameOver();
        } else {
          showPattern();
          turn()          
        }
      }
      
      // Is It End
      if (click == pattern.length && gameOn == true) {
        if(pattern.length >= 5) {
          gameWin();
        }
        console.log(pattern);
        document.getElementById('counter').innerText = pattern.length;
        whoseTurn = "cpu";
        turn();
      }
    }
  }
}

function gameStart() {
  document.getElementById('counter').innerText = 0;
  document.getElementById('starttext').innerText = "Restart";
  document.getElementById('startlight').style.background = "#ff0000";
  gameOn = true;
  pattern = [];
  whoseTurn = "cpu"
  turn();
}

function gameWin() {
  document.getElementById("output").innerText = "You Win!";
  document.getElementById('startlight').style.background = "#893b3b";
  addRemove("remove");
  gameOn = false;
}

function gameOver() {
  document.getElementById("output").innerText = "You Lose!";
  document.getElementById('startlight').style.background = "#893b3b";
  addRemove("remove");
  gameOn = false;
}
document.getElementById('start').addEventListener('click', gameStart);
