let timer; // To store the interval
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);

  let hoursStr = hours.toString().padStart(2, '0');
  let minutesStr = minutes.toString().padStart(2, '0');
  let secondsStr = seconds.toString().padStart(2, '0');

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function displayTime() {
  const display = document.getElementById('display');
  display.textContent = formatTime(elapsedTime);
}

function startPause() {
  if (!isRunning) {
    isRunning = true;
    document.getElementById('startPause').textContent = 'Pause';
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      displayTime();
    }, 10);
  } else {
    isRunning = false;
    document.getElementById('startPause').textContent = 'Start';
    clearInterval(timer);
  }
}

function lapReset() {
  if (isRunning) {
    let lapTime = elapsedTime;
    laps.unshift(lapTime);
    displayLaps();
  } else {
    elapsedTime = 0;
    laps = [];
    displayTime();
    displayLaps();
  }
}

function displayLaps() {
  const lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
  laps.forEach((lap, index) => {
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap-item');
    lapItem.textContent = `Lap ${index + 1}: ${formatTime(lap)}`;
    lapsList.appendChild(lapItem);
  });
}
