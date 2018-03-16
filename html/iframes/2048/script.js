const WIDTH = 401;
const HEIGHT = 491;

const SIZE = 4;
const CELL_SIZE = Math.floor(WIDTH / SIZE);

let game;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(200);
  game = new Game2048(SIZE, SIZE);
  game.reset();
  noLoop();
}

function draw() {
  game.draw(CELL_SIZE);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    game.move(LEFT);
  } else if (keyCode === RIGHT_ARROW) {
    game.move(RIGHT);
  } else if (keyCode === UP_ARROW) {
    game.move(UP);
  } else if (keyCode === DOWN_ARROW) {
    game.move(DOWN);
  }
  game.draw(CELL_SIZE);
}
