import { kaleidoscope } from "../kaleidoscope.js";
import { spline } from "@georgedoescode/spline";

export function drawSvg({ canvas, actions, actionIndex, rotations }) {
  let markup = "";

  for (let i = 0; i <= actionIndex; i++) {
    const newActions = kaleidoscope(actions[i], rotations);

    newActions.forEach(({ ...action }) => {
      if (action.type === "stroke") {
        markup += `
          <path
            stroke="${action.color}"
            fill="none"
            stroke-width="${action.size}"
            stroke-linecap="round"
            d="${spline(action.points)}"
          />
        `;
      }
    });
  }

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${canvas.width}" 
      height="${canvas.height}"
      viewBox="
        0 0
        ${canvas.width * window.devicePixelRatio} 
        ${canvas.height * window.devicePixelRatio}
      "
    >
      ${markup}
    </svg>
  `;
}
