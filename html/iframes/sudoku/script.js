// Code goes here
var sudoku;
var nbHoles = 60;
function setup() {
  createCanvas(362, 362);
  background(240);
  sudoku = new Sudoku(40);
  sudoku.generateGrid(nbHoles);
}

function draw() {
  frameRate(20);
  sudoku.drawGrid();
  sudoku.checkGrid();
}

function mousePressed() {
  var x = mouseX;
  var y = mouseY;

  var cell = sudoku.getCellAt(x, y);
  if (cell !== undefined) {
    if (cell === sudoku.selectedCell) {
      sudoku.setCellValue(cell, ((sudoku.selectedCell.number + 1) % 10));
    } else {
      sudoku.setSelectedCell(cell);
    }
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    sudoku.moveSelection(0)
  } else if (keyCode === RIGHT_ARROW) {
    sudoku.moveSelection(1);
  } else if (keyCode === DOWN_ARROW) {
    sudoku.moveSelection(2);
  } else if (keyCode === LEFT_ARROW) {
    sudoku.moveSelection(3);
  } else if (keyCode === 96 || keyCode === 48 || keyCode === BACKSPACE || keyCode === DELETE || keyCode === RETURN || keyCode === ESCAPE) {
    sudoku.setCellValue(sudoku.selectedCell, 0);
  } else if (keyCode >= 49 && keyCode <= 57) {
    sudoku.setCellValue(sudoku.selectedCell, keyCode - 48);
  } else if (keyCode >= 97 && keyCode <= 105) {
    sudoku.setCellValue(sudoku.selectedCell, keyCode - 96);
  } else {
    sudoku.setShowPossiblities(!sudoku.showPossiblities);
  }
}