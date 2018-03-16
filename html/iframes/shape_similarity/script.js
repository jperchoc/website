var button;
let shapes = [
  {
    label:'1',
    points: [
    {x:0, y:0},
    {x:20, y: 1},
    {x:40, y: 3},
    {x:100, y: 0},
    {x:100, y: 5},
    {x:100, y:100},
    {x:0, y:100}
    ]
  }, 
  {
    label:'2',
    points: [
    {x:300, y: 0},
    {x:300, y: 200},
    {x:400, y: 100},
    ]
  }, 
  {
    label:'3',
    points: [
    {x:500, y: 0},
    {x:600, y: 100},
    {x:500, y: 200},
    ]
  }, 
  {
    label:'4',
    points: [
    {x:700, y: 50},
    {x:750, y: 50},
    {x:750, y:100},
    {x:700, y:100}
    ]
  }
];

function setup() {
  createCanvas(800, 1000);
  background(0);
  //frameRate(1);
  noLoop();
  angleMode(RADIANS);
  button = createButton('click me');
  button.position(19, 19);
  button.mousePressed(createFrame);

  shapes[2].points = [];
  let r = 50;
  for(let i = 0; i < 360; i+=20) {
    x = 500 + r*cos(i);
    y = 100 + r*sin(i);
    shapes[2].points.push({x:x, y:y});
  }
  
}

function draw() {
  createFrame();
}

function createFrame() {
  x0 = 20;
  background(0);
  stroke(150,200,250, 110);
  fill(150,200,250, 110);
  drawShape(shapes[0]);

  stroke(200,150,250, 110);
  fill(200,150,250, 110);
  drawShape(shapes[1]);

  stroke(250,150,200, 110);
  fill(250,150,200, 110);
  drawShape(shapes[2]);

  stroke(150,250,200, 110);
  fill(150,250,200, 110);
  drawShape(shapes[3]);
  
  fill(255);
  calcSim();

  updateShape(shapes[Math.floor(random(shapes.length))]);
}

function calcSim() {
  for (let i = 0; i < shapes.length; i++) {
    for (let j = 0; j < shapes.length; j++) {
      if (i != j) {
        let options = {
          normalize : 1,
          precision : 100,
          drawGraphs: true,
          drawDiff  : true,
          color1    : {r:250, g: 125, b:100, a:255},
          color2    : {r:125, g: 250, b:100, a:255},
          color3    : {r:200, g: 200, b:250, a:125},
          x0        : 20 + j*200,
          y0        : 310 + i*200,
          xRatio    : 150,
          yRatio    : 0.5
        };
        let sim = map(getShapeSimilarity(shapes[i].points, shapes[j].points, options), -1, 1, 0, 100);
        fill(255);
        text(shapes[j].label+'&'+shapes[i].label+': ' + sim.toFixed(3) + '%', 30 + j*200, 220 + i*200);
      }
    } 
  }
}

function updateShape(shape) {
  if (random(100) > 90) {
    shape.points.push({x:random(800), y:random(200)});
  } else {
    let idx = Math.floor(random(shape.points.length - 1));
    shape.points[idx] = {x:random(800), y:random(200)};
  }
}

function drawShape(shape) {
  beginShape();
  for (let i =0; i< shape.points.length; i++) {
    vertex(shape.points[i].x, shape.points[i].y);
  }
  endShape();
}

