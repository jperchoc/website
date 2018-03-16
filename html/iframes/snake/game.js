const EMPTY_CELL = 0;
const SNAKE_CELL = 1;
const WALL = 2;
const APPLE = 3;
const SNAKE_HEAD = 4;

class SnakeGame {
  constructor(cellSize, HCells, WCells) {
    this.toggleEdges(false);
    this.cellSize = cellSize;
    this.HCells = HCells;
    this.WCells = WCells;
    //Generating Snake
    this.snake = this._generateSnake(HCells, WCells);
    //Generating Apple
    this.apple = {x:this.snake._snake[0].x + 1, y:this.snake._snake[0].y};//this._generateApple();
  }

  toggleEdges(v) {
    this._egdes = v;
  }

  getCellContent(x, y) {
    if(this._isEdge(x, y)) return WALL;
    else if (this.apple.x === x && this.apple.y === y) return APPLE;
    else if (this.snake.isPresent(x, y)) return (this.snake.getSnake()[0].x === x && this.snake.getSnake()[0].y ===y) 
    ? SNAKE_HEAD : SNAKE_CELL;
    else return EMPTY_CELL;
  }

  _generateApple() {
    let x, y;
     do {
      x = Math.round(random(this.WCells - 1));
      y = Math.round(random(this.HCells - 1));
     } while(this.snake.isPresent(x, y) || this._isEdge(x, y));
     return {x:x, y:y};
  }

  _generateSnake(HCells, WCells) {
    let xSnake;
    let ySnake;
    xSnake = Math.round(this.WCells/2);
    ySnake = Math.round(this.HCells/2);
    return new Snake(xSnake, ySnake, HCells, WCells);
  }

  _isEdge(x, y) {
    let isEdge = 
      x === 0 ||
      x === this.WCells - 1 ||
      y === 0 ||
      y === this.HCells - 1;
    return this._egdes && isEdge;
  }

  update() {
    let result = 0;
    this.snake.move(this.apple);
    let head = this.snake.getSnake()[0];
    if (head.x === this.apple.x && head.y === this.apple.y) {
      this.apple = this._generateApple();
      result = 1;
    }
    if (this._isEdge(head.x, head.y) || this.snake.isCrossed()) {
      //Generating Snake
      this.snake = this._generateSnake(this.HCells, this.WCells);
      //Generating Apple
      this.apple = this._generateApple();
      //this.snake.revertMove(this.apple);
      result = -1;
    } 
    return result;
  }



  //AI
  getCellNextSnake(direction) {
    switch (direction) {
      case 0: //LEFT:
        break;
      case 1: //FRONT:
        break;
      case 2: //RIGHT:
        break;
    }
  }
  getDistToApple() {
    let head = this.snake.getSnake()[0];
    let apple = this.apple;
    let x = head.x - apple.x;
    let y = head.y - apple.y;
    return Math.sqrt(x*x + y*y);

  }

  getAngleToApple() {
    let head = this.snake.getSnake()[0];
    let apple = this.apple;
    let deltaY = apple.y - head.y
    let deltaX = apple.x - head.x
    return Math.atan2(deltaY, deltaX) * 180 / PI
  }
}
