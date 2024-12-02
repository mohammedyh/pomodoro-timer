const pomodoroTime = document.querySelector(".pomodoro__time");
const pomodoroState = document.querySelector(".pomodoro__state");
const modes = document.querySelectorAll(".mode");
const getStartedMessage = document.querySelector(".get-started");
const sound = document.querySelector("audio");
const helpTooltip = document.querySelector(".help__tooltip");
const helpTooltipContent = document.querySelector(".help__tooltip-content");
const settingsModalPopover = document.querySelector("#settings-modal");
const settingsModalCloseBtn = document.querySelector(".settings-modal__close");
const fontButtons = document.querySelectorAll("[data-font]");
const accentColorButtons = document.querySelectorAll("[data-accent-color]");
const settingsModalApplyButton = document.querySelector(".settings-modal__btn");
let countdown;

modes.forEach((mode) => mode.addEventListener("click", switchModes));

function switchModes(e) {
  const secondsForMode = parseInt(e.target.dataset.time, 10);
  modes.forEach((mode) => mode.classList.remove("active"));
  e.target.classList.add("active");
  getStartedMessage.style.display = "none";
  timer(secondsForMode);
}

function timer(seconds) {
  clearInterval(countdown);
  const start = Date.now();
  const finish = start + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((finish - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      document.title = "Time Up!";
      sound.currentTime = 5;
      sound.play();
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const displayTime = `${minutes}:${
    secondsRemaining < 10 ? "0" : ""
  }${secondsRemaining}`;
  document.title = displayTime;
  pomodoroTime.textContent = displayTime;
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".tooltip-container")) {
    helpTooltipContent.classList.remove("visible");
    return;
  }

  helpTooltipContent.classList.toggle("visible");
});

document.addEventListener("keyup", (e) => {
  if (e.key === "s") settingsModalPopover.togglePopover();
});

settingsModalCloseBtn.addEventListener("click", () =>
  settingsModalPopover.hidePopover()
);

const setupActiveToggleEvents = (buttons) => {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      buttons.forEach((button) => button.classList.remove("active"));
      event.target.classList.toggle("active");
    });
  });
};

setupActiveToggleEvents(fontButtons);
setupActiveToggleEvents(accentColorButtons);

settingsModalApplyButton.addEventListener('click', applySettings)

function applySettings(event) {
  // TODO: store / save settings to localStorage

  settingsModalPopover.hidePopover();
}

function saveToLocalStorage() {
  // TODO: implement function
}

function getFromLocalStorage() {
  // TODO: implement function
}
