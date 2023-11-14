import { angleBetweenPoints } from "./math/angle-between-points.js";
import { distanceBetweenPoints } from "./math/distance-between-points.js";
import { pointInDirection } from "./math/point-in-direction.js";

// TODO: share this
const canvas = document.querySelector("canvas");

export function kaleidoscope(action, count = 6) {
  let mirroredActions = [];

  const rotationChange = 360 / count;

  for (let i = rotationChange / -2; i <= 360; i += rotationChange) {
    const newAction = { ...action };

    if (action.type === "stroke") {
      newAction.points = action.points.map((point) => {
        return rotatePointAroundCenter(point, i);
      });
    }

    mirroredActions.push(newAction);
  }

  console.log(mirroredActions);

  return mirroredActions;
}

function rotatePointAroundCenter(point, rotation) {
  const centerPoint = { x: canvas.width / 2, y: canvas.height / 2 };

  let angleFromCenterToPoint = angleBetweenPoints(centerPoint, point);
  const distanceFromCenterToPoint = distanceBetweenPoints(centerPoint, point);

  angleFromCenterToPoint += rotation;

  return pointInDirection(
    centerPoint,
    angleFromCenterToPoint,
    distanceFromCenterToPoint
  );
}
