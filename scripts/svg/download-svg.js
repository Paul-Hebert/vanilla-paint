export function downloadSvg(svgContents) {
  const anchor = document.createElement("a");
  anchor.setAttribute("download", "drawing");
  anchor.setAttribute("href", "data:image/svg+xml;base64," + btoa(svgContents));
  // console.log("data:image/svg+xml;utf8," + svgContents.replaceAll("#", "\\#"));
  anchor.setAttribute("target", "_blank");
  anchor.click();
}
