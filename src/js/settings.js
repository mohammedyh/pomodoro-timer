const fontButtons = document.querySelectorAll("[data-font]");
const accentColorButtons = document.querySelectorAll("[data-accent-color]");
const settingsModalPopover = document.querySelector("#settings-modal");
const pomodoroTimeInput = document.querySelector("#pomodoro");
const shortBreakTimeInput = document.querySelector("#short-break");
const longBreakTimeInput = document.querySelector("#long-break");

export function handleSettingsFormSubmit() {
  const selectedFontButton = document.querySelector("[data-font].active");
  const selectedAccentColorButton = document.querySelector("[data-accent-color].active");
  const timeInputs = [pomodoroTimeInput, shortBreakTimeInput, longBreakTimeInput];

  if (timeInputs.some((input) => !input.checkValidity())) {
    return timeInputs.forEach((input) => input.reportValidity());
  }

  const formValues = {
    pomodoroTime: parseInt(pomodoroTimeInput.value) * 60,
    shortBreakTime: parseInt(shortBreakTimeInput.value) * 60,
    longBreakTime: parseInt(longBreakTimeInput.value) * 60,
    font: selectedFontButton.dataset.font,
    accentColor: selectedAccentColorButton.dataset.accentColor,
  };

  setAppSettings(formValues);
  localStorage.setItem("settings", JSON.stringify(formValues));
  settingsModalPopover.hidePopover();
}

export function loadSettings() {
  const settings = JSON.parse(localStorage.getItem("settings"));

  if (!settings) return;

  setAppSettings(settings);
  populateSettingsForm(settings);
}

export function populateSettingsForm(settings) {
  pomodoroTimeInput.value = parseInt(settings.pomodoroTime) / 60;
  shortBreakTimeInput.value = parseInt(settings.shortBreakTime) / 60;
  longBreakTimeInput.value = parseInt(settings.longBreakTime) / 60;

  setActiveButton(fontButtons, "font", settings.font);
  setActiveButton(accentColorButtons, "bg", settings.accentColor);
}

function setActiveButton(buttons, classPrefix, classEnding) {
  Array.from(buttons)
    .map((button) => (button.classList.remove("active"), button))
    .find((button) => button.classList.contains(`${classPrefix}-${classEnding}`))
    .classList.add("active");
}

function setAppSettings(settings) {
  const pomodoroModeTime = document.querySelector("[data-pomodoro]");
  const shortBreakModeTime = document.querySelector("[data-short-break]");
  const longBreakModeTime = document.querySelector("[data-long-break]");

  pomodoroModeTime.dataset.time = settings.pomodoroTime;
  shortBreakModeTime.dataset.time = settings.shortBreakTime;
  longBreakModeTime.dataset.time = settings.longBreakTime;
  document.documentElement.style.setProperty("--font", `var(--font-${settings.font})`);
  document.documentElement.style.setProperty(
    "--color-accent",
    `var(--color-${settings.accentColor})`
  );
}
