// https://stackoverflow.com/a/17130415/7816145
export function mousePositionOnCanvas(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) * window.devicePixelRatio,
    y: (evt.clientY - rect.top) * window.devicePixelRatio,
  };
}
