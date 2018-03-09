let c = document.getElementById('myCanvas');
c.width = 800;
c.height = 800;
let ctx = c.getContext('2d');
let colors = {
  red: {
    x: 410,
    y: 390,
  },
  green: {
    x: 410,
    y: 410,
  }, 
  yellow: {
    x: 390,
    y: 410,
  },
  blue: {
    x: 390,
    y: 390,
  }
}

function drawBoard() {
  ctx.clearRect(0, 0, c.width, c.height);

  ctx.beginPath();
  ctx.arc(c.width/2, c.height/2, 300, 0, 2*Math.PI, false);
  ctx.fillStyle = "black";
  ctx.fill();
  
  ctx.beginPath();
  ctx.arc(colors.red.x, colors.red.y, 220, (-90*(Math.PI/180))+1*(Math.PI/180), (0*(Math.PI/180))-1*(Math.PI/180), false);
  ctx.lineWidth = 100;
  ctx.strokeStyle = "red";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(colors.green.x, colors.green.y, 220, 0*(Math.PI/180), 90*(Math.PI/180), false);
  ctx.lineWidth = 100;
  ctx.strokeStyle = "green";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(colors.yellow.x, colors.yellow.y, 220, 90*(Math.PI/180), 180*(Math.PI/180), false);
  ctx.lineWidth = 100;
  ctx.strokeStyle = "yellow";
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(colors.blue.x, colors.blue.y, 220, 180*(Math.PI/180), 270*(Math.PI/180), false);
  ctx.lineWidth = 100;
  ctx.strokeStyle = "blue";
  ctx.stroke();
  
}

drawBoard();
