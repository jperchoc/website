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
  if ((mouseX>=10 && mouseX <=380) && ((mouseY >= 90 && mouseY < 90+85) ||
    (mouseY >= 90 + 15 + 85 && mouseY < 90 + 15 + 85 + 85) ||
    (mouseY >= 90 + 2*(15 + 85) && mouseY < 90 + 2*(15 + 85) + 85))) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  if (game.gameOver) game.reset();
  else {
    if (mouseX>=10 && mouseX <=380) {
      if (mouseY >= 90 && mouseY < 90+85) {
        game.click(0);
      } else if (mouseY >= 90 + 15 + 85 && mouseY < 90 + 15 + 85 + 85) {
        game.click(1);
      } else if (mouseY >= 90 + 2*(15 + 85) && mouseY < 90 + 2*(15 + 85) + 85) {
        game.click(2);
      }
    }
  }
  return false;
}
