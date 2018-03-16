const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

class Game2048 {
  //Game's constructor
  constructor(rows = 4, cols = 4) {
    this.ROWS = rows;
    this.COLS = rows;
    this.reset();
  }

  //Reset the game and generate a new grid
  reset() {
    this.score = 0;
    this.grid = Utils.generateEmptyGrid(this.ROWS, this.COLS);
    this._addNumber();
    this._addNumber();
  }

  //Draws the game
  draw(cellSize) {
    background("#faf8ef");
    textSize(18);
    strokeWeight(1);
    stroke("#bbad9f");
    fill("#bbad9f");
    //Top bar
    let topBarHeight = 80;
    rectMode(CORNER);
    textAlign("left", CENTER);
    text("Score: " + this.score, 15, 40);
    //Game
    let margin = 10;
    let round = 10;

    strokeWeight(10);
    rect(0, 80, this.COLS * cellSize, this.ROWS * cellSize, round);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    for (let row = 0; row < this.ROWS; row++) {
      for (let col = 0; col < this.COLS; col++) {
        strokeWeight(margin);
        stroke("#bbad9f");
        fill(Utils.getCellColor(this.grid[row][col]));
        rect(
          col * cellSize + cellSize / 2,
          topBarHeight + row * cellSize + cellSize / 2,
          cellSize,
          cellSize,
          round
        );

        if (this.grid[row][col] !== 0) {
          strokeWeight(1);
          textSize(18);
          stroke(Utils.getNumColor(this.grid[row][col]));
          fill(Utils.getNumColor(this.grid[row][col]));
          text(
            this.grid[row][col],
            col * cellSize + cellSize / 2,
            topBarHeight + row * cellSize + cellSize / 2
          );
        }
      }
    }
  }

  //Apply a movemement to the grid
  move(direction) {
    let oldGrid = Utils.cloneArray(this.grid);
    //On crée une nouvelle grille pour ne conerver que le mouvement vers la droite
    let transposeTimes = direction + (direction % 2 === 0 ? 1 : -1);
    let newGrid = this._transposeGrid(this.grid, transposeTimes);
    //On applique le mouvement
    this._applyMovement(newGrid);
    //On transpose la grille
    this.grid = this._transposeGrid(newGrid, 4 - transposeTimes);
    //On ajoute un nombre si la grille a changé
    if (Utils.gridEquals(oldGrid, this.grid) === false)
      this._addNumber();
  }

  //PRIVATE: adds a number (2 or 4) to the grid (if possible)
  _addNumber() {
    let options = [];
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLS; j++) {
        if (this.grid[i][j] === 0) {
          options.push({ x: i, y: j });
        }
      }
    }
    if (options.length > 0) {
      let spot = random(options);
      this.grid[spot.x][spot.y] = random(1) > 0.1 ? 2 : 4;
    }
  }

  //PRIVATE: rotates the grid n times to the right
  _transposeGrid(gridA, n) {
    n %= 4;
    let gridB = Utils.generateEmptyGrid(this.ROWS, this.COLS);

    for (let itt = 0; itt < n; itt++) {
      // On transpose de +90
      let dim = gridA[0].length;
      for (let row = 0; row < dim; row++) {
        for (let col = 0; col < dim; col++) {
          gridB[row][col] = gridA[dim - 1 - col][row];
        }
      }
      gridA = Utils.cloneArray(gridB);
    }
    return n === 0 ? gridA : gridB;
  }

  //PRIVATE: Apply a right movement to the grid
  _applyMovement(grid) {
    for (let row = 0; row < grid.length; row++) {
      //Apply movement to row
      grid[row] = this._slide(grid[row]);
      grid[row] = this._combine(grid[row]);
      grid[row] = this._slide(grid[row]);
    }
  }

  //PRIVATE: Slide numbers in the row to the right
  _slide(row) {
    let arr = row.filter(val => val);
    let missing = row.length - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
  }

  //PRIVATE: Combine numbers in the row
  _combine(row) {
    for (let i = this.COLS - 1; i >= 1; i--) {
      let a = row[i];
      let b = row[i - 1];
      if (a == b) {
        row[i] = a + b;
        this.score += row[i];
        row[i - 1] = 0;
      }
    }
    return row;
  }
}
