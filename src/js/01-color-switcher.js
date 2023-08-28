const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let interval = null;

startBtn.addEventListener('click', onStartClick);
stopBtn.addEventListener('click', onStopClick);

function onStartClick(evt) {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  interval = setInterval(changeBgColor, 1000);
}

function onStopClick(evt) {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(interval);
}

function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
