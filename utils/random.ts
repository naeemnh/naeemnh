export function random(min: number, max?: number): number {
  if (arguments.length < 2) {
    max = min;
    min = 0;
  }

  if (min > max!) {
    const hold = max;
    max = min;
    min = hold!;
  }

  return Math.floor(Math.random() * (max! - min + 1)) + min;
}