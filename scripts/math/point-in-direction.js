import { degreesToRadians } from "./degrees-to-radian.js";

export function pointInDirection(startPos, rotation, distance) {
  const rotationInRadians = degreesToRadians(rotation - 90);
  return {
    x: startPos.x + Math.cos(rotationInRadians) * distance,
    y: startPos.y + Math.sin(rotationInRadians) * distance,
  };
}
