import { drawStroke } from "./draw-stroke.js";

export function drawCanvas({ canvas, context, strokes }) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  strokes.forEach((stroke) => {
    drawStroke({ ...stroke, context });
  });
}
