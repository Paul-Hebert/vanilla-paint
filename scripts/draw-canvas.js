import { drawStroke } from "./draw-stroke.js";
import { kaleidoscope } from "./kaleidoscope.js";

export function drawCanvas({
  canvas,
  context,
  actions,
  actionIndex,
  rotations,
}) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i <= actionIndex; i++) {
    const newActions = kaleidoscope(actions[i], rotations);

    newActions.forEach(({ ...action }) => {
      if (action.type === "stroke") {
        drawStroke({ ...action, context });
      }
    });
  }
}
