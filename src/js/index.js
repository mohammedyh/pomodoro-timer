import { applySettings, loadSettings } from "./settings.js";
import { timer } from "./timer.js";

const modes = document.querySelectorAll(".mode");
const getStartedMessage = document.querySelector(".get-started");
const fontButtons = document.querySelectorAll("[data-font]");
const accentColorButtons = document.querySelectorAll("[data-accent-color]");
const settingsModalPopover = document.querySelector("#settings-modal");
const settingsModalCloseBtn = document.querySelector(".settings-modal__close");
const settingsModalApplyButton = document.querySelector(".settings-modal__btn");

modes.forEach((mode) => mode.addEventListener("click", switchModes));

function switchModes(e) {
  const secondsForMode = parseInt(e.target.dataset.time, 10);
  modes.forEach((mode) => mode.classList.remove("active"));
  e.target.classList.add("active");
  getStartedMessage.style.display = "none";
  timer(secondsForMode);
}

document.addEventListener("keyup", (e) => {
  if (e.target.localName === "input") return;
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

settingsModalApplyButton.addEventListener("click", applySettings);

// Put into a settings.js module file
// function applySettings() {
//   // Existing Modes
//   const pomodoroModeTime = document.querySelector("[data-pomodoro]");
//   const shortBreakModeTime = document.querySelector("[data-short-break]");
//   const longBreakModeTime = document.querySelector("[data-long-break]");

//   // Settings Modal Inputs
//   const pomodoroTime = document.querySelector("#pomodoro");
//   const shortBreakTime = document.querySelector("#short-break");
//   const longBreakTime = document.querySelector("#long-break");
//   const selectedFont = document.querySelector("[data-font].active");
//   const selectedAccentColor = document.querySelector(
//     "[data-accent-color].active"
//   );
//   const timeInputs = [pomodoroTime, shortBreakTime, longBreakTime]

//   if (timeInputs.some(input => !input.checkValidity())) {
//     return timeInputs.forEach(input => input.reportValidity());
//   }

//   const settings = {
//     pomodoroTime: parseInt(pomodoroTime.value) * 60,
//     shortBreakTime: parseInt(shortBreakTime.value) * 60,
//     longBreakTime: parseInt(longBreakTime.value) * 60,
//     font: selectedFont.dataset.font,
//     accentColor: selectedAccentColor.dataset.accentColor,
//   };

//   pomodoroModeTime.dataset.time = settings.pomodoroTime;
//   shortBreakModeTime.dataset.time = settings.shortBreakTime;
//   longBreakModeTime.dataset.time = settings.longBreakTime;

//   document.documentElement.style.setProperty(
//     "--font",
//     `var(--font-${settings.font})`
//   );
//   document.documentElement.style.setProperty(
//     "--color-accent",
//     `var(--color-${settings.accentColor})`
//   );

//   localStorage.setItem("settings", JSON.stringify(settings));
//   settingsModalPopover.hidePopover();
// }

// function loadSettings() {
//   let settings = localStorage.getItem("settings");

//   if (!settings) return;

//   settings = JSON.parse(settings);

//   document.querySelector("[data-pomodoro]").dataset.time = settings.pomodoroTime;
//   document.querySelector("[data-short-break]").dataset.time = settings.shortBreakTime;
//   document.querySelector("[data-long-break]").dataset.time = settings.longBreakTime;
//   document.documentElement.style.setProperty("--font", `var(--font-${settings.font})`);
//   document.documentElement.style.setProperty("--color-accent", `var(--color-${settings.accentColor})`);

//   populateSettingsForm(settings);
// }

loadSettings();

// function populateSettingsForm(settings) {
//   const pomodoroTime = document.querySelector("#pomodoro");
//   const shortBreakTime = document.querySelector("#short-break");
//   const longBreakTime = document.querySelector("#long-break");

//   pomodoroTime.value = parseInt(settings.pomodoroTime) / 60;
//   shortBreakTime.value = parseInt(settings.shortBreakTime) / 60;
//   longBreakTime.value = parseInt(settings.longBreakTime) / 60;

//   fontButtons.forEach((button) => button.classList.remove("active"));
//   Array.from(fontButtons)
//     .find((button) => button.classList.contains(`font-${settings.font}`))
//     .classList.add("active");

//   accentColorButtons.forEach((button) => button.classList.remove("active"));
//   Array.from(accentColorButtons)
//     .find((button) => button.classList.contains(`bg-${settings.accentColor}`))
//     .classList.add("active");
// }
