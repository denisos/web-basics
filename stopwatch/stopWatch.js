// setup listeners
const stopBtnEl = document.querySelector('.stop-btn');
const startBtnEl = document.querySelector('.start-btn');
const secondsEl = document.querySelector('.stopwatch-container-timers .seconds');
const minutesEl = document.querySelector('.stopwatch-container-timers .minutes');

let timerIntId;
let seconds = 0;
let minutes = 0;

function toTwoDigitNum(num) {
  return (num < 10) ? `0${num}` : num;
}

function updateTimes() {
  seconds += 1;
  if (seconds === 60) {
    seconds = 1;
    minutes += 1;
  }
  secondsEl.textContent = toTwoDigitNum(seconds);
  minutesEl.textContent = toTwoDigitNum(minutes);
}

// start timers
function startTimers() {
  timerIntId = setInterval(updateTimes, 1000);
}

// cancel timers
function cancelTimers() {
  clearInterval(timerIntId);
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