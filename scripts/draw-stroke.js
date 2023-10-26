import { drawCircle } from "./draw-circle.js";

export function drawStroke({ size, color, points, context }) {
  drawCircle({ color, context, radius: size / 2, ...points[0] });
  drawCircle({
    color,
    context,
    radius: size / 2,
    ...points[points.length - 1],
  });

  context.lineWidth = size;
  context.strokeStyle = color;

  // https://stackoverflow.com/a/49371349/7816145
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);

  var t = 1;
  for (var i = 0; i < points.length - 1; i++) {
    var p0 = i > 0 ? points[i - 1] : points[0];
    var p1 = points[i];
    var p2 = points[i + 1];
    var p3 = i != points.length - 2 ? points[i + 2] : p2;

    var cp1x = p1.x + ((p2.x - p0.x) / 6) * t;
    var cp1y = p1.y + ((p2.y - p0.y) / 6) * t;

    var cp2x = p2.x - ((p3.x - p1.x) / 6) * t;
    var cp2y = p2.y - ((p3.y - p1.y) / 6) * t;

    context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }
  context.stroke();
}
