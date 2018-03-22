class MineSweeper {
  constructor(gridDimensionW, gridDimensionH, nBombs, cellSize) {
    this.cellSize = cellSize;
    this.grid = this._initNewGrid(gridDimensionW, gridDimensionH, nBombs);
    this.lose = false;
    this.win = false;
  }

  draw() {
    fill(240);
    rect(0, 0, WIDTH, 30);
    fill(0);
    textAlign(LEFT, TOP);
    textSize(12);
    let infos = this.getGridInfos();
    text('Bombs: ' + infos.bombs, 10, 0);
    text('Flags: ' + infos.flagged, 10, 15);
    textAlign(RIGHT, TOP);
    text('Open: ' + infos.open + ' / ' + infos.cells, WIDTH-10, 0);
    //text('maybe: ' + infos.flagged, WIDTH-10, 15);
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[0].length; y++) {
        let cell = this.grid[x][y];
        cell.draw(x, y, this.cellSize, this.win, this.lose, this.grid);
      }
    }
  }
  getGridInfos() {
    let infos = {
      bombs: 0,
      flagged: 0,
      open: 0,
      maybe: 0,
      cells: 0
    };
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[0].length; y++) {
        let cell = this.grid[x][y];
        if (cell.isBomb) infos.bombs++;
        if (cell.state === CellState.FLAGGED) infos.flagged++;
        if (cell.state === CellState.MAYBE) infos.maybe++;
        if (cell.state === CellState.OPEN || cell.state === CellState.FLAGGED) infos.open++;
        infos.cells++;
      }
    }
    if (infos.open === infos.cells && infos.flagged === infos.bombs) this.win = true;
    return infos;
  }

  openCell(x, y) {
    let c = this.grid[x][y];
    if (c.state === CellState.CLOSED) {
      c.state = CellState.OPEN;
      if (c.isBomb) this.lose = true;
    }
  }

  changeCellState(x, y) {
    let c = this.grid[x][y];
    if (c.state === CellState.CLOSED) c.state = CellState.FLAGGED;
    else if (c.state === CellState.FLAGGED) c.state = CellState.MAYBE;
    else if (c.state === CellState.MAYBE) c.state = CellState.CLOSED;
  }

  doubleClickAllGrid() {
    for (let x = 0; x < this.grid.length; x++) {
      for (let y = 0; y < this.grid[0].length; y++) {
        this.performDoubleClick(x, y);
      }
    }
  }

  performDoubleClick(x, y) {
    let x1 = this.grid.length;
    let y1 = this.grid[0].length;
    let cell = this.grid[x][y];
    if (cell.neighbourBombs > 0) {
      let neighbours = MineSweeperCell.getNeighbour(x, y, this.grid);
      let nbMarkedCells = neighbours.filter(c => c.state === CellState.FLAGGED)
        .length;
      if (nbMarkedCells === cell.neighbourBombs) {
        neighbours.forEach(c => {
          if (c.state === CellState.CLOSED) {
            c.state = CellState.OPEN;
            if (c.isBomb) this.lose = true;
          }
        });
      }
    }
  }

  _initNewGrid(w, h, nbombs) {
    let minesIndex = [];
    do {
      let idx = Math.floor(random(w * h));
      if (minesIndex.indexOf(idx) === -1) {
        minesIndex.push(idx);
      }
    } while (minesIndex.length < nbombs);
    let cnt = 0;
    let grid = [];
    for (let x = 0; x < w; x++) {
      grid[x] = [];
      for (let y = 0; y < h; y++) {
        grid[x][y] = new MineSweeperCell(minesIndex.indexOf(cnt) !== -1);
        cnt++;
      }
    }
    return grid;
  }
}
