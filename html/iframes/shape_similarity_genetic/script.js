let shapeCible = {
  points: []
};
const SHAPE_POINTS= 6;
let genetic;

function setup() {
  createCanvas(400, 400);
  background(0);
  //Generate random shape
  for (let i = 0; i < SHAPE_POINTS; i++) {
    shapeCible.points[i] = {
      x: random(0, width),
      y: random(0, height),
    };
  }
  //Initialize gentic algorithm
  genetic = new GeneticShape(shapeCible, 400, 400, 20, 40);
}

function draw() {
  background(0);
  //Compute next generation
  genetic.getNextGen();
  //Draw original shape
  fill(100, 250, 125, 125);
  drawShape(shapeCible);
  //Draw best shape from generation
  fill(100, 125, 250, 125);
  drawShape(genetic.getBestShape());
  fill(255);
  //Write score & gen
  text(genetic.getBestShape().score, 10, 10);
  text("Gen : " + genetic.getGen(), 10, 20);
  text("Avg : " + genetic.getAverage().toFixed(2), 10, 30);
}

function drawShape(shape) {
  beginShape();
  for (let i =0; i< shape.points.length; i++) {
    vertex(shape.points[i].x, shape.points[i].y);
  }
  endShape();
}



