const CellState = {
  CLOSED: 0,
  FLAGGED: 1,
  MAYBE: 2,
  OPEN: 3
};

const MineSweeperColors = {
  stroke: "#c0c0bf",
  open: "#f9f9f9",
  closed: "#dbdbdb",
  bombOpen: "#a00",
  bombLose: "#f00",
  flag: "#5c5",
  neighbour: [
    "#f9f9f9",
    "#0000FF",
    "#008200",
    "#FF0000",
    "#000084",
    "#840000",
    "#008284",
    "#840084",
    "#000000"
  ]
};

class MineSweeperCell {
  constructor(isBomb) {
    this.state = CellState.CLOSED;
    this.isBomb = isBomb;
    this.neighbourBombs = -1;
  }
  draw(x, y, size, win, lose, grid) {
    let backgroundColor =
      this.state === CellState.OPEN
        ? MineSweeperColors.open
        : MineSweeperColors.closed;
    if (this.isBomb) {
      if (this.state === CellState.OPEN)
        backgroundColor = MineSweeperColors.bombOpen;
      else if (lose) backgroundColor = MineSweeperColors.bombLose;
    }
    fill(backgroundColor);
    stroke(MineSweeperColors.stroke);
    textAlign(CENTER, CENTER);
    rect(x * size, 30 + y * size, size, size);
    //FLAGGED
    if (this.state === CellState.FLAGGED) {
      fill(MineSweeperColors.flag);
      if (win) rect(x * size, 30 + y * size, size, size);
      else rect(x * size + 5, 30 + y * size + 5, size - 10, size - 10);
    } else if (this.state === CellState.MAYBE) {
      //MAYBE
      fill(5);
      text("?", x * size + size / 2, 30 + y * size + size / 2);
    } else if (this.state === CellState.OPEN && !this.isBomb) {
      //OPEN
      let neighbours = MineSweeperCell.getNeighbour(x, y, grid);
      if (this.neighbourBombs === -1) {
        this.neighbourBombs = neighbours.filter(c => c.isBomb).length;
        if (this.neighbourBombs === 0)
          neighbours.forEach(c => {
            if (c.state === CellState.CLOSED) c.state = CellState.OPEN;
          });
      }
      textSize(14);
      noStroke();
      fill(MineSweeperColors.neighbour[this.neighbourBombs]);
      text(this.neighbourBombs, x * size + size / 2, 30 + y * size + size / 2);
    }
  }

  static getNeighbour(x, y, grid) {
    let x1 = grid.length;
    let y1 = grid[0].length;
    let neighbour = [];
    for (let i = -1; i < 2; i++)
      for (let j = -1; j < 2; j++)
        if (
          x + i >= 0 &&
          x + i < x1 &&
          y + j >= 0 &&
          y + j < y1 &&
          !(i === 0 && j === 0)
        )
          neighbour.push(grid[x + i][y + j]);
    return neighbour;
  }

  _computeNeighbourBombs(x, y, grid) {
    return MineSweeperCell.getNeighbour(x, y, grid).filter(c => c.isBomb)
      .length;
  }
}
