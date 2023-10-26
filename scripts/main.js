import { drawCanvas } from "./draw-canvas.js";
import { initCanvas } from "./init-canvas.js";
import { mousePositionOnCanvas } from "./mouse-position-on-canvas.js";

const strokes = [];
let pointsInCurrentStroke = [];

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
context.lineCap = "round";

let color = "#333";
let size = "20";

let animationFrame;

initCanvas(canvas);

let isDrawing = false;

canvas.addEventListener("pointerdown", (e) => {
  isDrawing = true;
  pointsInCurrentStroke.push(mousePositionOnCanvas(canvas, e));

  strokes.push({
    color,
    size,
    points: pointsInCurrentStroke,
  });
  drawCanvas({ canvas, context, strokes });
});

canvas.addEventListener("pointermove", (e) => {
  if (isDrawing) {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    animationFrame = requestAnimationFrame(() => {
      pointsInCurrentStroke.push(mousePositionOnCanvas(canvas, e));

      strokes[strokes.length - 1] = {
        color,
        size,
        points: pointsInCurrentStroke,
      };
      drawCanvas({ canvas, context, strokes });
    });
  }
});

document.addEventListener("pointerup", () => {
  isDrawing = false;
  pointsInCurrentStroke = [];
});

document.querySelector(".js-undo").addEventListener("click", () => {
  strokes.pop();
  drawCanvas({ canvas, context, strokes });
});

[...document.querySelectorAll(".color-checkbox input")].forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    document
      .querySelector(".color-checkbox.selected")
      .classList.remove("selected");
    color = checkbox.value;
    checkbox.closest("label").classList.add("selected");
  });
});

document.querySelector(".size-range").addEventListener("input", (e) => {
  size = e.target.value;
});
