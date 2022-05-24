const state = {
  activeLight: 'red',
  nextLightMap: {
    "red": "yellow",
    "yellow": "green",
    "green": "red"
  },
  intervalTimer: undefined
}

// setup listeners
const stopBtnEl = document.querySelector('.stop-btn');
const startBtnEl = document.querySelector('.start-btn');

startBtnEl.addEventListener('click', function(e) {
  clearInterval(state.intervalTimer);
  state.intervalTimer = setInterval(changeState, 3000)
});

stopBtnEl.addEventListener('click', function(e) {
  clearInterval(state.intervalTimer);
  state.activeLight = 'red';
});

function updateLightsUI() {
  const activeLight = state.activeLight;
  // console.log("updateLightsUI new active ", activeLight)

  const allLights =  document.querySelectorAll('.light');
  allLights.forEach((light) => {
    light.classList.remove('active')
  });

  const activeEl =  document.querySelector(`.${activeLight}-light`);
  activeEl.classList.add('active');
}


function changeState() {
  // change activeLight to the next light in sequence
  state.activeLight = state.nextLightMap[state.activeLight];

  updateLightsUI();
}
