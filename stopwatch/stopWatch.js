// setup listeners
const stopBtnEl = document.querySelector('.stop-btn');
const startBtnEl = document.querySelector('.start-btn');
const secondsEl = document.querySelector('.stopwatch-container-timers .seconds');
const minutesEl = document.querySelector('.stopwatch-container-timers .minutes');

let secondsIntId;
let minutesIntId;
let seconds = 0;
let minutes = 0;

function toTwoDigitNum(num) {
  return (num < 10) ? `0${num}` : num;
}

function updateSeconds() {
  seconds += 1;
  if (seconds === 60) {
    seconds = 1;
  }
  secondsEl.textContent = toTwoDigitNum(seconds);
}

function updateMinutes() {
  minutes += 1;
  if (minutes === 60) {
    minutes = 1;
  }
  minutesEl.textContent = toTwoDigitNum(minutes);
}

// start timers
function startTimers() {
  secondsIntId = setInterval(updateSeconds, 1000);
  minutesIntId = setInterval(updateMinutes, 60000);
}

// cancel timers
function cancelTimers() {
  clearInterval(secondsIntId);
  clearInterval(minutesIntId);
  seconds = 0;
  minutes = 0;
}

// stop btn handler
stopBtnEl.addEventListener('click', (e) => {
  // cancel timers
  cancelTimers();
  // reset times
  secondsEl.textContent = '00';
  minutesEl.textContent = '00';
})

// start btn handler
startBtnEl.addEventListener('click', function(e) {
  // cancel timers
  startTimers();
})