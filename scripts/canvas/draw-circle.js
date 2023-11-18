export function drawCircle({ x, y, color, radius, context }) {
  context.fillStyle = color;

  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  context.fill();
}
