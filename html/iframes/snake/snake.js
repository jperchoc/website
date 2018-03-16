const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

class Snake {
  constructor(x, y, worldX, worldY) {
    this._world = {
      x: worldX,
      y: worldY
    }
    this._snake = [{x:x, y:y}, {x:x-1, y:y}];
    this._direction = RIGHT;
  }

  getSnake() {
    return this._snake;
  }

  isPresent(x, y) {
    let isPresent = false;
    for (let i = 0; i < this._snake.length; i++) {
      if (this._snake[i].x === x && this._snake[i].y === y) {
        isPresent = true;
        break;
      }
    }
    return isPresent;
  }

  move(apple) {
    switch (this._direction) {
      case UP:
        this._updateArray(0, -1, apple);
      break;
      case RIGHT:
        this._updateArray(1, 0, apple);
      break;
      case DOWN:
        this._updateArray(0, 1, apple);
      break;
      case LEFT:
        this._updateArray(-1, 0, apple);
      break;
    }
  }
  revertMove(apple) {
    switch (this._direction) {
      case UP:
        this._updateArray(0, 1, apple);
      break;
      case RIGHT:
        this._updateArray(-1, 0, apple);
      break;
      case DOWN:
        this._updateArray(0, -1, apple);
      break;
      case LEFT:
        this._updateArray(1, 0, apple);
      break;
    }
    this._snake = [this._snake[0], this._snake[1]];
  }

  updateDirection(direction) {
    this._direction = this._isOpposite(direction, this._direction) ? this._direction : direction;
  }

  _isOpposite(dir1, dir2) {
    switch (dir1) {
      case UP: return dir2===DOWN;
      case DOWN: return dir2===UP;
      case LEFT: return dir2===RIGHT;
      case RIGHT: return dir2===LEFT;
    }
  } 

  _updateArray(ox, oy, apple) {
    let head = {x: this._snake[0].x + ox, y: this._snake[0].y + oy};

    //If edge of world, move to opposite side
    if (head.x < 0) head.x = this._world.x;
    if (head.x > this._world.x) head.x = 0;
    if (head.y < 0) head.y = this._world.y;
    if (head.y > this._world.y) head.y = 0;
    
    if (head.x === apple.x && head.y === apple.y) {
      this._snake.unshift(head);
    } else {
      let nSnake = [];
      for (let i = 0; i < this._snake.length; i++) {
        nSnake.push(i === 0 ? head : this._snake[i - 1]);
      }
      this._snake = nSnake;
    }
  }

  isCrossed() {
    let head = this._snake[0];
    let crossed = false;
    for (let i = 0; i < this._snake.length; i++) {
      if (i !== 0 && this._snake[i].x === head.x && this._snake[i].y === head.y) {
        crossed = true;
        break;
      }
    }
    return crossed;
  }
}
