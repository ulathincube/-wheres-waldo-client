export function timeCounter(counter: number) {
  let minutes, seconds;
  minutes = Math.floor(counter / 60);
  seconds = counter % 60;

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
