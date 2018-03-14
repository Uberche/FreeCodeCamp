let strict = false;
let humanTurn = false;
var pattern = [];
let numDisplay = 0;

function button(id,name,brightColor,darkColor,audio){
  this.id = id;
  this.name = name;
  this.color = darkColor;
  this.brightColor = brightColor;
  this.audio = new Audio(audio);
  this.highlight = function () {
    let id = this.id;
    let oldColor = this.color;
    console.log(audio);
    this.audio.play();
    document.getElementById(name).style.backgroundColor = this.brightColor;
    setTimeout(function() {
      document.getElementById(name).style.backgroundColor = oldColor;      
    }, 500);
  }
}

let buttonArray = [
  new button(0,"upleft","#0000ff", "#0000ba",'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  new button(1,"upright","#ff0000", "#ba0000",'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  new button(2,"downleft","#ffff00", "#baba00",'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  new button(3,"downright","#00ff00", "#00ba00",'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
]

let startButton = document.getElementById('startt');
startButton.addEventListener('click', startGame);

let strictButton = document.getElementById('strictt');
strictButton.addEventListener('click', strictOn);

function strictOn() {
  let bgColor = strictButton.style.backgroundColor;
  if (strict == false) {
    Object.assign(strictButton.style, { backgroundColor: 'green' })
    strict = true;
  } else {
    Object.assign(strictButton.style, { backgroundColor: '#094000' })
    strict = false;
  }
}

function startGame() {
  humanTurn = false;
  pattern = [];
  this.style.backgroundColor = 'red';
  this.style.boxShadow = '0px 0px 3px 3px #400000';
  turn();
}

function turn() {
  if(!humanTurn) {
    extendPattern();
    showPattern();
  } else {
    human();
  }
}

function extendPattern() {
  let newOne = Math.floor(Math.random()*4);
  pattern.push([newOne,buttonArray[newOne].name]);
}

function showPattern() {
  let p=1;
  for(let i=0; i<pattern.length; i++) {
    window.setTimeout(function() {
      console.log(buttonArray[pattern[i][0]]);
      buttonArray[pattern[i][0]].highlight();
    }, 750*p);
    p++;
  }
  humanTurn = true;
  turn();
}

function human() {
  let humanPattern = [];  
  let but = document.getElementsByClassName('buttons');
  for(let i=0; i<but.length; i++) {
    but[i].style.cursor = "pointer";
    but[i].addEventListener('click', attempt);
  }

  function attempt(e) {
    let nowId = e.target.id;
    humanPattern.push(nowId);
    for(let i=0; i<buttonArray.length; i++) {
      if (buttonArray[i].name == nowId) {
        console.log(buttonArray[i]);
        buttonArray[i].highlight();
      }
    }
    
    if (humanPattern.length == pattern.length) {
      humanTurn = false;
      turn();
    }
  }
}
