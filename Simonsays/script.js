let strict = false;
let humanTurn = false;
let pattern = [];

function button(name,brightColor,darkColor){
  this.id = name;
  this.color = darkColor;
  this.brightColor = brightColor;
  this.highlight = function () {
    let id = this.id;
    let oldColor = this.color;
    document.getElementById(id).style.backgroundColor = this.brightColor;
    setTimeout(function() {
      document.getElementById(id).style.backgroundColor = oldColor;      
    }, 500);
  }
}

let buttonArray = [
  new button("upleft","#0000ff", "#0000ba"),
  new button("upright","#ff0000", "#ba0000"),
  new button("downleft","#ffff00", "#baba00"),
  new button("downright","#00ff00", "#00ba00"),
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
  pattern.push([buttonArray[newOne].id,newOne]);
  console.log(pattern);
}

function showPattern() {
  let p=1;
  pattern.forEach(function(x) {
    window.setTimeout(function() {
      let audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (x[1]+1) + '.mp3');
      audio.play();
      buttonArray[x[1]].highlight();
    }, 750*p);
    p++;
  });
  humanTurn = true;
  turn();
}

function human() {
  let but = document.getElementsByClassName('buttons');
  for(let i=0; i<but.length; i++) {
    but[i].style.cursor = "pointer";
    but[i].addEventListener('click', attempt);
  }

  function attempt(e) {
    let humanPattern = [];
    let nowId = e.target.id;
    humanPattern.push(nowId);
    for(let i=0; i<buttonArray.length; i++) {
      if (buttonArray[i].id == nowId) {
        let audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (i+1) + '.mp3');
        audio.play();
        buttonArray[i].highlight();
      }
    }
    humanPattern.forEach((x,ind) => {
      console.log(x);
      console.log(ind);
    });
  }
}
