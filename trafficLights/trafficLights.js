const state = {
  activeLight: 'red',
  lightPreviousMap: {
    "red": "green",
    "yellow": "red",
    "green": "yellow"
  },
  intervalTimer: undefined
}

// setup listeners
const stopBtnEl = document.querySelector('.stop-btn');
const startBtnEl = document.querySelector('.start-btn');

startBtnEl.addEventListener('click', function(e) {
  clearInterval(state.intervalTimer);
  state.intervalTimer = setInterval(changeState, 4000)
});

stopBtnEl.addEventListener('click', function(e) {
  clearInterval(state.intervalTimer);
  state.activeLight = 'red';
});

function updateLightsUI() {
  const activeLight = state.activeLight;
  const previousLight = state.lightPreviousMap[activeLight];

  console.log("updateLightsUI ", activeLight, previousLight)

  const previousEl =  document.querySelector(`.${previousLight}-light`);
  previousEl.classList.remove(previousLight);

  const activeEl =  document.querySelector(`.${activeLight}-light`);
  activeEl.classList.add(activeLight);
}


function changeState() {
  if (state.activeLight === 'red') {
    state.activeLight = 'yellow';
  } else if (state.activeLight === 'yellow') {
    state.activeLight = 'green';
  } else {
    state.activeLight = 'red';
  } 

  updateLightsUI();
}
