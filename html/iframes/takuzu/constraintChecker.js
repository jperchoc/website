function ConstraintChecker() {
  
  this.check = function (grid) {
    //clear errors and init rows and cols arrays
    let rowsAndCols = initGrid(grid);
    //check 3 cells with same value
    checkThreeSameValuesCells(grid);
    //check unbalanced values
    checkUnbalancedValues(grid, rowsAndCols.rows, rowsAndCols.cols);
    //check identic rows
    checkIdenticity(rowsAndCols.rows);
    //check identic cols
    checkIdenticity(rowsAndCols.cols);
    //Return true if grid is full and there's no error
    return gridIsFullAndNoError(grid);
  }
  
  function initGrid(grid) {
    let rows = [];
    let cols = [];
    let size = grid.data.length;
    for (let i = 0; i < size; i++) {
      rows[i] = [];
      cols[i] = [];
    }
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let cell = grid.getCell(row, col);
        rows[row].push(cell);
        cols[col].push(cell);
        cell.error = false;
      }
    }
    return { rows, cols };
  }

  function checkIdenticity(items) {
    for(var i = 0; i < items.length - 1; i++) {
      let item1 = items[i];
      for(var j = i + 1; j < items.length; j++) {
        let item2 = items[j];
        if (isEqualCells(item1, item2)) {
          for (let k = 0; k < items.length; k++) {
            item1[k].error = true;
            item2[k].error = true;
          }
        }
      }
    }
  }

  function gridIsFullAndNoError(grid) {
    let full = true;
    let error = false;
    for (let row = 0; row < grid.data.length; row++) {
      for (let col = 0; col < grid.data.length; col++) {
        let cell = grid.getCell(row, col);
        //If grid is incomplete, stop.
        if(cell.getValue() === -1) {
          full = false;
          break;
        }
        //If grid has error, stop
        if(cell.error) {
          error = true;
          break;
        }
      }
    }
    return full && !error;
  }

  function checkThreeSameValuesCells(grid) {
    let size = grid.data.length;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        let cell = grid.getCell(row, col);
        let Hneighb = [cell];
        let Vneighb = [cell];
        if (row > 0) {
          Vneighb.push(grid.getCell(row - 1, col));
        }
        if (row < size - 1) {
          Vneighb.push(grid.getCell(row + 1, col));
        }
        if (col > 0) {
          Hneighb.push(grid.getCell(row, col - 1));
        }
        if (col < size - 1) {
          Hneighb.push(grid.getCell(row, col + 1));
        }
        if (Hneighb.length === 3) {
          if (Hneighb[0].getValue() != -1 &&
            Hneighb[0].getValue() === Hneighb[1].getValue() &&
            Hneighb[1].getValue() == Hneighb[2].getValue()) {
            Hneighb[0].error = true;
            Hneighb[1].error = true;
            Hneighb[2].error = true;
          }
        }
        if (Vneighb.length === 3) {
          if (Vneighb[0].getValue() != -1 &&
            Vneighb[0].getValue() === Vneighb[1].getValue() &&
            Vneighb[1].getValue() == Vneighb[2].getValue()) {
            Vneighb[0].error = true;
            Vneighb[1].error = true;
            Vneighb[2].error = true;
          }
        }
      }
    }
  }

  function checkUnbalancedValues(grid, rows, cols) {
    var limit = grid.data.length / 2;
    for (let i = 0; i < rows.length; i++) {
      let row = rows[i];
      let col = cols[i];
      let nbr0 = 0, nbr1 = 0;
      let nbc0 = 0, nbc1 = 0;
      for (let j = 0; j < row.length; j++) {
        let valr = row[j].getValue();
        let valc = col[j].getValue();
        nbr0 += (valr === 0 ? 1 : 0);
        nbr1 += (valr === 1 ? 1 : 0);
        nbc0 += (valc === 0 ? 1 : 0);
        nbc1 += (valc === 1 ? 1 : 0);
      }
      if (nbr0 > limit || nbr1 > limit) {
        for (let j = 0; j < row.length; j++) {
          row[j].error = true;
        }
      }
      if (nbc0 > limit || nbc1 > limit) {
        for (let j = 0; j < col.length; j++) {
          col[j].error = true;
        }
      }
    }
  }

  function isEqualCells(item1, item2) {
    if(item1.length != item2.length) 
      return false;
    else {
      for (let i = 0; i < item1.length; i++) {
        let value1 = item1[i].getValue();
        let value2 = item2[i].getValue();
        if (value1 !== value2 || value1 === -1 || value2 === -1) 
          return false;
      }
      return true;
    }
  }
}
