const fontButtons = document.querySelectorAll("[data-font]");
const accentColorButtons = document.querySelectorAll("[data-accent-color]");
const settingsModalPopover = document.querySelector("#settings-modal");

export function applySettings() {
  // Existing Modes
  const pomodoroModeTime = document.querySelector("[data-pomodoro]");
  const shortBreakModeTime = document.querySelector("[data-short-break]");
  const longBreakModeTime = document.querySelector("[data-long-break]");

  // Settings Modal Inputs
  const pomodoroTimeInput = document.querySelector("#pomodoro");
  const shortBreakTimeInput = document.querySelector("#short-break");
  const longBreakTimeInput = document.querySelector("#long-break");
  const selectedFontButton = document.querySelector("[data-font].active");
  const selectedAccentColorButton = document.querySelector(
    "[data-accent-color].active"
  );
  const timeInputs = [
    pomodoroTimeInput,
    shortBreakTimeInput,
    longBreakTimeInput,
  ];

  if (timeInputs.some((input) => !input.checkValidity())) {
    return timeInputs.forEach((input) => input.reportValidity());
  }

  const settings = {
    pomodoroTime: parseInt(pomodoroTimeInput.value) * 60,
    shortBreakTime: parseInt(shortBreakTimeInput.value) * 60,
    longBreakTime: parseInt(longBreakTimeInput.value) * 60,
    font: selectedFontButton.dataset.font,
    accentColor: selectedAccentColorButton.dataset.accentColor,
  };

  pomodoroModeTime.dataset.time = settings.pomodoroTime;
  shortBreakModeTime.dataset.time = settings.shortBreakTime;
  longBreakModeTime.dataset.time = settings.longBreakTime;

  document.documentElement.style.setProperty(
    "--font",
    `var(--font-${settings.font})`
  );
  document.documentElement.style.setProperty(
    "--color-accent",
    `var(--color-${settings.accentColor})`
  );

  localStorage.setItem("settings", JSON.stringify(settings));
  settingsModalPopover.hidePopover();
}

export function loadSettings() {
  let settings = localStorage.getItem("settings");

  if (!settings) return;

  settings = JSON.parse(settings);

  document.querySelector("[data-pomodoro]").dataset.time =
    settings.pomodoroTime;
  document.querySelector("[data-short-break]").dataset.time =
    settings.shortBreakTime;
  document.querySelector("[data-long-break]").dataset.time =
    settings.longBreakTime;
  document.documentElement.style.setProperty(
    "--font",
    `var(--font-${settings.font})`
  );
  document.documentElement.style.setProperty(
    "--color-accent",
    `var(--color-${settings.accentColor})`
  );

  populateSettingsForm(settings);
}

export function populateSettingsForm(settings) {
  const pomodoroTime = document.querySelector("#pomodoro");
  const shortBreakTime = document.querySelector("#short-break");
  const longBreakTime = document.querySelector("#long-break");

  pomodoroTime.value = parseInt(settings.pomodoroTime) / 60;
  shortBreakTime.value = parseInt(settings.shortBreakTime) / 60;
  longBreakTime.value = parseInt(settings.longBreakTime) / 60;

  fontButtons.forEach((button) => button.classList.remove("active"));
  Array.from(fontButtons)
    .find((button) => button.classList.contains(`font-${settings.font}`))
    .classList.add("active");

  accentColorButtons.forEach((button) => button.classList.remove("active"));
  Array.from(accentColorButtons)
    .find((button) => button.classList.contains(`bg-${settings.accentColor}`))
    .classList.add("active");
}
