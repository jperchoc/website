var takuzu;


function setup() {
  let nbCellsPerLine = 6;
  let cellSizePx = 30;
  takuzu = new Takuzu(nbCellsPerLine, cellSizePx);
  takuzu.checkGrid();
  createCanvas(cellSizePx * nbCellsPerLine + 1, cellSizePx * nbCellsPerLine + 1);
  background(240);
}

function draw() {
  takuzu.drawGrid();
}

function mousePressed() {
  let x = mouseX;
  let y = mouseY;

  let cell = takuzu.getCellAt(x, y);
  if (cell !== undefined) {
    takuzu.changeCellValue(cell);
    takuzu.checkGrid();
  }
}
