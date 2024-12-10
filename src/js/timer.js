const pomodoroTime = document.querySelector(".pomodoro__time");
const sound = document.querySelector("audio");
let countdown;

export function timer(seconds) {
  clearInterval(countdown);
  const start = Date.now();
  const finish = start + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((finish - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      document.title = "Time Up!";
      sound.play();
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

export function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  const displayTime = `${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
  document.title = displayTime;
  pomodoroTime.textContent = displayTime;
}
