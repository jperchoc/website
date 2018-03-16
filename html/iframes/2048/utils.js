class Utils {

  //Clone an array without reference
  static cloneArray(existingArray) {
    var newObj = existingArray instanceof Array ? [] : {};
    for (let i in existingArray) {
      if (i == "clone") continue;
      if (existingArray[i] && typeof existingArray[i] == "object") {
        newObj[i] = this.cloneArray(existingArray[i]);
      } else {
        newObj[i] = existingArray[i];
      }
    }
    return newObj;
  }

  //Generate an empty grid
  static generateEmptyGrid(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  }

  //Get font color for a cell
  static getNumColor(number) {
    if (number <= 4) return "#766e65";
    return "#f9f6f2";
  }

  //Get cell color
  static getCellColor(value) {
    if (value > 8192) return "#E21B5A";
    if (value ===2) return "#eee4da";
    if (value ===4) return "#ede0c8";
    if (value ===8) return "#f2b179";
    if (value ===16) return "#f59563";
    if (value ===32) return "#f67c5f";
    if (value ===64) return "#f65e3b";
    if (value ===128) return "#edcf72";
    if (value ===256) return "#edcc61";
    if (value ===512) return "#edc850";
    if (value ===1024) return "#edc53f";
    if (value ===2048) return "#edc22e";
    if (value ===4096) return "#E21B5A";
    if (value ===8192) return "#E21B5A";
    else return "#cec1b5";
  }

  //Compare grids equality
  static gridEquals(grid1, grid2) {
    for(let row = 0; row < grid1.length; row++) {
      for (let col = 0; col < grid1[0].length; col++)
        if (grid1[row][col] !== grid2[row][col])
          return false;
    }
    return true;
  }
}
