import { drawCanvas } from "./draw-canvas.js";
import { initCanvas } from "./init-canvas.js";
import { mousePositionOnCanvas } from "./mouse-position-on-canvas.js";

const canvas = document.querySelector("canvas");
const undoButton = document.querySelector(".js-undo");
const redoButton = document.querySelector(".js-redo");

let actionIndex = -1;

const actions = [];
let pointsInCurrentStroke = [];

const context = canvas.getContext("2d");
context.lineCap = "round";

let color = "#333";
let size = "20";
let rotations = 6;

let animationFrame;

initCanvas(canvas);

let isDrawing = false;

canvas.addEventListener("pointerdown", (e) => {
  isDrawing = true;
  pointsInCurrentStroke.push(mousePositionOnCanvas(canvas, e));

  // Remove any "redo" actions
  while (actionIndex < actions.length - 1) {
    actions.pop();
  }

  actions.push({
    type: "stroke",
    color,
    size,
    points: pointsInCurrentStroke,
  });

  actionIndex = actions.length - 1;

  updateRedoButton();
  drawCanvas({ canvas, context, actions, actionIndex, rotations });
});

canvas.addEventListener("pointermove", (e) => {
  if (isDrawing) {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    animationFrame = requestAnimationFrame(() => {
      pointsInCurrentStroke.push(mousePositionOnCanvas(canvas, e));

      actions[actions.length - 1] = {
        type: "stroke",
        color,
        size,
        points: pointsInCurrentStroke,
      };
      drawCanvas({ canvas, context, actions, actionIndex, rotations });
    });
  }
});

document.addEventListener("pointerup", () => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }

  isDrawing = false;
  pointsInCurrentStroke = [];
});

undoButton.addEventListener("click", () => {
  actionIndex--;

  if (actionIndex < -1) {
    actionIndex = -1;
  }
  drawCanvas({ canvas, context, actions, actionIndex, rotations });
  updateRedoButton();
});

redoButton.addEventListener("click", () => {
  actionIndex++;

  if (actionIndex > actions.length - 1) {
    actions.length - 1;
  }
  drawCanvas({ canvas, context, actions, actionIndex, rotations });
  updateRedoButton();
});

function updateRedoButton() {
  if (actionIndex < actions.length - 1) {
    redoButton.removeAttribute("disabled");
  } else {
    redoButton.setAttribute("disabled", true);
  }
}

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

document.querySelector(".rotations-range").addEventListener("input", (e) => {
  rotations = e.target.value;
  drawCanvas({ canvas, context, actions, actionIndex, rotations });
});
