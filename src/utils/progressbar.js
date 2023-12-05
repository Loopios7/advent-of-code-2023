/**
 * Print progress bar for CLI
 *
 * @param {number} progress Progress so far
 * @param {number} total Total progress to reach
 * @param {number} length Length of the bar
 * @param {boolean} showAbsolute Show absolute progress (e.g. 100/1000)
 */
export function printProgressBar(
  progress,
  total = 100,
  length = 20,
  showAbsolute = false,
) {
  const percent = Math.min(
    100,
    Math.max(0, Math.floor((progress / total) * 100)),
  );
  const filledLength = Math.floor((length * progress) / total);
  const bar = "█".repeat(filledLength) + "-".repeat(length - filledLength);

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(
    `Progress: [${bar}] ${percent}%`,
    showAbsolute ? ` (${progress}/${total})` : "",
  );
}
