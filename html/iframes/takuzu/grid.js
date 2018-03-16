function Grid(size, px) {
  
  this.size = size;
  this.px = px;
  this.data = [];
  
  for (let row = 0; row < this.size; row++) {
    this.data[row] = [];
    for (let col = 0; col < this.size; col++) {
      this.data[row][col] = new Cell(-1, row, col, false);
    }
  }
  
  this.setGrid = function(grid) {
    this.data = [];
    let idx = 0;
    for (let row = 0; row < this.size; row++) {
      this.data[row] = [];
      for (let col = 0; col < this.size; col++) {
        this.data[row][col] = grid ?
          new Cell(grid[idx], row, col, grid[idx] != -1) :
          new Cell(-1, row, col, false);
        idx++;
      }
    }
  };
  
  this.getCell = function (row, col) {
    return this.data[row][col];
  };

  this.draw = function () {
    fill(255, 255, 255, 255);
    rect(0, 0, this.size*this.px, this.size*this.px);
    textSize(12);
    stroke(0);
    strokeWeight(1);
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        let cell = this.getCell(row, col);
        fill(
          cell.getColors().backColor.R,
          cell.getColors().backColor.G,
          cell.getColors().backColor.B
          );
        rect(col * this.px, row * this.px, this.px, this.px);
        fill(
          cell.getColors().foreColor.R,
          cell.getColors().foreColor.G,
          cell.getColors().foreColor.B
          );
        if(cell.getValue() != -1) {
          text(cell.getValue(), col * this.px + 1, row * this.px + 1, this.px, this.px);
        }
      } 
    }
  };
}
