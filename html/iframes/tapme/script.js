let WIDTH = 400;
let HEIGHT = 450;
let fps = 30;
let game;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(fps);
  game = new TapMe(fps);
}

function draw() {
  background("#fffeea");
  game.draw();
  //handle cursor
  if (getButtonClicked(mouseX, mouseY) !== -1) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  if (game.gameOver) game.reset();
  else {
    let idxBtn = getButtonClicked(mouseX, mouseY);
    if (idxBtn !== -1)
      game.click(idxBtn);
  }
  return false;
}

function getButtonClicked(x, y) {
  let idx = -1;
  let x0 = 10;
  let x1 = 390;
  let yb0 = 90;
  let btnH = 85;
  let marginBtn = 15;
  if (x>=x0 && x <=x1) {
    if (y >= yb0 && y < yb0+btnH) {
      idx = 0;
    } else if (y >= yb0 + marginBtn + btnH && y < yb0 + marginBtn + btnH + btnH) {
      idx = 1;
    } else if (y >= yb0 + 2*(marginBtn + btnH) && y < yb0 + 2*(marginBtn + btnH) + btnH) {
      idx = 2;
    }
  }
  return idx;
}
