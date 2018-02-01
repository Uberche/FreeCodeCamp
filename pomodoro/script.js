//Building from code here: https://appendto.com/2016/10/comparing-javascript-jquery-build-a-pomodoro-timer/

let pomodoro = {
  counter: 0,
  sessionType: 'session',
  running: false,
  minutes: 0,
  seconds: 0,
  userSession: 0,
  userBreak: 0,
  fillerHeight: 0,
  fillerIncrement: 0,
  interval: null,
  minutesDom : null,
  secondsDom: null,
  fillerDom: null, 
  audio: null,
  sessionAudio: null,
  init: function() {
    let self = this;
    this.userSession = parseInt(document.querySelector("#sessiontime").innerText);
    this.userBreak = parseInt(document.querySelector("#breaktime").innerText);
    this.minutesDom = document.querySelector("#minutes");
    this.secondsDom = document.querySelector("#seconds");
    this.fillerDom = document.querySelector("#filler");
    this.audio = new Audio('http://www.freggie.ca/images/button-21.mp3');
    this.sessionAudio = new Audio('http://www.freggie.ca/images/bell.mp3');
    this.interval = setInterval(function() {
      self.intervalCallback.apply(self);
    }, 1000);
    document.querySelector("#sessionuparrow").onclick = function() {
      self.sessionUp.apply(self);
    }
    document.querySelector("#sessiondownarrow").onclick = function() {
      self.sessionDown.apply(self);
    }
    document.querySelector("#breakuparrow").onclick = function() {
      self.breakUp.apply(self);
    }
    document.querySelector("#breakdownarrow").onclick = function() {
      self.breakDown.apply(self);
    }
    document.querySelector("#startbtn").onclick = function() {
      self.startWork.apply(self);
    };
    document.querySelector("#stopbtn").onclick = function() {
      self.stopTimer.apply(self);
    };
    document.querySelector("#resetbtn").onclick = function() {
      self.resetTimer.apply(self);
    };
  },
  
  resetVariables: function(mins,secs,started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200/(this.minutes*60);
    this.fillerHeight = 0;
  },
  sessionUp: function() {
    this.audio.pause()
    this.audio.currentTime = 0;
    this.audio.play();
    this.userSession++;
    document.querySelector("#sessiontime").innerText = this.userSession;
    if (this.sessionType == "session") {
      document.querySelector("#minutes").innerText = this.toDoubleDigit(this.userSession);
      document.querySelector("#seconds").innerText = "00";
    }
  },
  sessionDown: function() {
    this.audio.pause()
    this.audio.currentTime = 0;
    this.audio.play();
    this.userSession--;
    document.querySelector("#sessiontime").innerText = this.userSession;
    if (this.sessionType == "session") {
      document.querySelector("#minutes").innerText = this.toDoubleDigit(this.userSession);
      document.querySelector("#seconds").innerText = "00";
    }
  },
  breakUp: function() {
    this.audio.pause()
    this.audio.currentTime = 0;
    this.audio.play();
    this.userBreak++;
    document.querySelector("#breaktime").innerText = this.userBreak;
  },
  breakDown: function() {
    this.audio.pause()
    this.audio.currentTime = 0;
    this.audio.play();
    this.userBreak--;
    document.querySelector("#breaktime").innerText = this.userBreak;
  },
  startWork: function() {
    this.resetVariables(this.userSession,0,true);
  },
  resetTimer: function() {
    this.resetVariables(this.userSession,0,false);    
    this.updateDom();
  },
  stopTimer: function() {
    this.resetVariables(this.minutes,this.seconds,false);
  },
  toDoubleDigit: function(num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom: function() {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    this.fillerHeight = this.fillerHeight + this.fillerIncrement;
    this.fillerDom.style.height = this.fillerHeight + 'px';
  },
  intervalCallback: function() {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        if (this.sessionType == "session") {
          this.sessionAudio.play();
          this.breakTime();
          return;
        } else if (this.sessionType == "break") {
          this.sessionAudio.play();
          this.sessionTime();
          return;
        }
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
    
  breakTime: function() {
    this.counter++;
    document.querySelector("#sessioncomp").innerText = this.counter;
    this.sessionType = "break";
    document.querySelector("#breaktype").style = "color: #003204"
    this.resetVariables(this.userBreak,0,true);
    this.fillerHeight = 0;
  },
  
  sessionTime: function() {
    this.sessionType = "session";
    this.resetVariables(this.userSession,0,true);
    this.fillerHeight = 0;
  }
};

window.onload = function() {
  document.querySelector("#minutes").innerText = document.querySelector("#sessiontime").innerText;
  pomodoro.init();
};
