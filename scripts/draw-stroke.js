import "cardinal-spline-js/curve.min.js";
import { drawCircle } from "./draw-circle.js";

export function drawStroke({ size, color, points, context }) {
  drawCircle({ color, context, radius: size / 2, ...points[0] });
  drawCircle({
    color,
    context,
    radius: size / 2,
    ...points[points.length - 1],
  });

  const pointsForCurve = [];

  points.forEach((point) => {
    pointsForCurve.push(point.x);
    pointsForCurve.push(point.y);
  });

  context.lineWidth = size;
  context.strokeStyle = color;

  // https://stackoverflow.com/a/49371349/7816145
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  context.curve(pointsForCurve);
  context.stroke();
}
