let count = parseInt(document.getElementById("timetext").innerHTML);
     
$("#breakuparrow").on('click', function() {
  let breaktime = document.getElementById("breaktime").innerText;
  breaktime++;
  document.getElementById("breaktime").innerText = breaktime;  
})

$("#breakdownarrow").on('click', function() {
  let breaktime = document.getElementById("breaktime").innerText;
  if (breaktime > 1) {
    breaktime--;
    document.getElementById("breaktime").innerText = breaktime;  
  }
});

$("#sessionuparrow").on('click', function() {
  let time = document.getElementById("sessiontime").innerText;
  time++;
  document.getElementById("sessiontime").innerText = time; 
  document.getElementById("timetext").innerText = time + ":00";
});

$("#sessiondownarrow").on ('click', function() {
  let time = document.getElementById("sessiontime").innerText;
  if (time > 1) {
    time--;
    document.getElementById("sessiontime").innerText = time; 
    document.getElementById("timetext").innerText = time + ":00"; 
  }
});

$('#startbtn').on('click', function() {
  let counter = setInterval(timer,1000);
  document.getElementById('timeinfo').innerText = "Session";

  $('#stopbtn').on('click', function() {
    clearInterval(counter);
  });

  $('#resetbtn').on('click', function() {
    clearInterval(counter);
    count = parseInt(document.getElementById("sessiontime").innerText); 
    document.getElementById("timetext").innerText = count + ":00"
  });
  
  function timer() {
    count-= 1;
    if (count == 0) {
      clearInterval(counter);
      
      document.getElementById('timeinfo').innerText = "Break";
      let startBreak = setInterval(breakTimer, 1000);
    }
    
    document.getElementById("timetext").innerText = count + ': 00';
    
    function breakTimer() {
      count = parseInt(document.getElementById("breaktime").innerHTML);
      document.getElementById("timetext").innerText = count + ': 00';
      count-=1;
      if (count === 0){
        clearInterval(startBreak);
      }
    }
  }
    

});
