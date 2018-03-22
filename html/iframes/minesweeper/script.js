const WIDTH = 16*20+1;
const HEIGHT = 16*20+1 + 30;
let minesweeper;

let options = {
  gridDimension:[16, 16],
  nbBombs: 40,
  cellsSize: 20
}

function setup() { 
  createCanvas(WIDTH, HEIGHT);
  background(0);
  minesweeper = new MineSweeper(options.gridDimension[0], options.gridDimension[1], options.nbBombs, options.cellsSize);
}

function draw() {
  background(10);
  minesweeper.draw();
}

function keyPressed() {
  if (minesweeper.lose || minesweeper.win) {
    minesweeper = new MineSweeper(options.gridDimension[0], options.gridDimension[1], options.nbBombs, options.cellsSize);
  } else {
    if (key === ' ') {
      minesweeper.doubleClickAllGrid();
    }
  }
}
function doubleClicked() {
  let x = Math.floor(mouseX / options.cellsSize);
  let y = Math.floor((mouseY-30) / options.cellsSize);
  if (x >= 0 && y >= 0 && x < options.gridDimension[0] && y < options.gridDimension[1] && mouseButton === LEFT) {
    minesweeper.performDoubleClick(x, y);
  }
}

function mousePressed() {
  if (minesweeper.lose || minesweeper.win) {
    minesweeper = new MineSweeper(options.gridDimension[0], options.gridDimension[1], options.nbBombs, options.cellsSize);
  } else {
    let x = Math.floor(mouseX / options.cellsSize);
    let y = Math.floor((mouseY-30) / options.cellsSize);
    if (x >= 0 && y >= 0 && x < options.gridDimension[0] && y < options.gridDimension[1]) {
      if (mouseButton === LEFT) {
        minesweeper.openCell(x, y);
      } else if (mouseButton === RIGHT) {
        minesweeper.changeCellState(x, y);
      }
    }
  }
}
