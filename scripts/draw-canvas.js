import { drawStroke } from "./draw-stroke.js";

export function drawCanvas({ canvas, context, actions, actionIndex }) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i <= actionIndex; i++) {
    const action = actions[i];

    if (action.type === "stroke") {
      drawStroke({ ...action, context });
    }
  }
}
