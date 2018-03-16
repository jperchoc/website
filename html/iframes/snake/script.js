
let enableWalls = true;
let size = 20;
let itt = 1;
let mod = 3;
let snakeGame;

let inputMode = NEIGHBOURS_CELLS;
let neighboursCells = 2;   

let spec = {
  inputMode: NEIGHBOURS_CELLS,
  neighboursCells: 2, //Neighbour cells. 1 => 9 cells, 2 => 25 cells ...
  size: size,
  update: 'qlearn', 
  gamma: 0.9,
  epsilon: 0.02,
  alpha: 0.005,
  experience_add_every: 5,
  tderror_clamp: 1.0,
  num_hidden_units: 100
};
let brain = null;

function setSpecsUI() {
  document.getElementById(spec.inputMode === GRID_MODE ? "inputModeGrid" : "inputModeNeighbour").checked = true;
  document.getElementById(spec.update === 'qlearn' ? "qlearn" : "sarsa").checked = true;
  document.getElementById('gamma').value = spec.gamma;
  document.getElementById('alpha').value = spec.alpha;
  document.getElementById('epsilon').value = spec.epsilon;
  document.getElementById('experience_add_every').value = spec.experience_add_every;
  document.getElementById('tderror_clamp').value = spec.tderror_clamp;
  document.getElementById('num_hidden_units').value = spec.num_hidden_units;
  document.getElementById('neighbourSize').value = spec.neighboursCells;
}
function getSpecs() {
  spec.inputMode = document.getElementById("inputModeGrid").checked ? GRID_MODE : NEIGHBOURS_CELLS;
  spec.update = document.getElementById("qlearn").checked ? "qlearn" : "sarsa";
  spec.gamma = document.getElementById('gamma').value;
  spec.alpha = document.getElementById('alpha').value;
  spec.epsilon = document.getElementById('epsilon').value;
  spec.experience_add_every = document.getElementById('experience_add_every').value;
  spec.tderror_clamp = document.getElementById('tderror_clamp').value;
  spec.num_hidden_units = document.getElementById('num_hidden_units').value;
  spec.neighboursCells = document.getElementById('neighbourSize').value;
  return spec;
}

function setup() {
  createCanvas(400, 400).parent('sketch-holder');
  snakeGame = new SnakeGame(20, size, size);
  snakeGame.toggleEdges(enableWalls); //Enable edges
  background(0);
  setSpecsUI();
  brain = new Agent(spec);
}

function draw() {
  background(0);
  for (let i = 0; i < itt; i++) {
    if (frameCount % mod === 0) {
      let direction = getBrainDecision();
      snakeGame.snake.updateDirection(direction);
      let reward = getReward();
      let result = snakeGame.update();
      if (result === 1) {
        reward = brain.rewards.apple;
      } else if (result === -1) {
        reward = brain.rewards.death;
      }
      brain.rewardCount.gameReward += reward;
      brain.learn(reward);

      if (result === -1) brain.rewardCount.recordReward();
    }
    if (itt < 100 || i === 0) drawChart();
  }
  document.getElementById('scoretxt').value = brain.rewardCount.totGamesMeanReward;
  if (itt > 100) console.log(brain.rewardCount.totGamesMeanReward);
}

function getReward() {
  return map(snakeGame.getDistToApple() ,0, Math.sqrt(2*(size*size)), brain.rewards.nearApple, brain.rewards.farApple);
}

function getBrainDecision() {
  let input = [];
  if (brain.spec.inputMode === NEIGHBOURS_CELLS) {
    let snakeHead = snakeGame.snake.getSnake()[0];
    for (let i = -neighboursCells; i <= neighboursCells; i++) {
      for (let j = -neighboursCells; j <= neighboursCells; j++) {
        input.push(map(snakeGame.getCellContent(snakeHead.x + i, snakeHead.y + j), 0, 4, 0, 1));
      }
    }
  } else {
   let i = 0;
    for (let line = 0; line < snakeGame.HCells; line++) {
      for (let col = 0; col < snakeGame.WCells; col++) {
        input[i++] = map(snakeGame.getCellContent(col, line), 0, 4, 0, 1);
      }
    }
  }
  input.push(map(snakeGame.getAngleToApple(), -180, 180, 0, 1));
  input.push(map(snakeGame.getDistToApple(), 0, Math.sqrt(2*(size*size)), 0, 1));
  let action = brain.act(input);
  return action;
}

function drawChart() {
  for (let line = 0; line < snakeGame.HCells; line++) {
    for (let col = 0; col < snakeGame.WCells; col++) {
      let x = col * snakeGame.cellSize;
      let y = line * snakeGame.cellSize;
      let w = snakeGame.cellSize;
      let h = snakeGame.cellSize;
      switch (snakeGame.getCellContent(col, line)) {
        case WALL:
          stroke(20, 20, 20);
          fill(120, 120, 120);
          rect(x, y, w, h);
          break;
        case SNAKE_CELL:
          stroke(150, 150, 150);
          fill(200, 200, 200);
          rect(x, y, w, h);
          stroke(120, 220, 120);
          fill(100, 200, 100);
          ellipse(x + w / 2, y + h / 2, w, h);
          break;
        case SNAKE_HEAD:
          stroke(150, 150, 150);
          fill(200, 200, 200);
          rect(x, y, w, h);
          stroke(100, 200, 100);
          fill(80, 180, 80);
          ellipse(x + w / 2, y + h / 2, w, h);
          break;
        case EMPTY_CELL:
          stroke(150, 150, 150);
          fill(200, 200, 200);
          rect(x, y, w, h);
          break;
        case APPLE:
          stroke(220, 120, 120);
          fill(200, 100, 100);
          rect(x, y, w, h);
          break;
      }
    }
  }
  stroke(0);
  strokeWeight(1);
  fill(255);
  text("Itt:" + brain.agent.t, 15, 15);
  text("Rew: " +
    brain.rewardCount.totGamesMinReward.toFixed(2) +
    " - " +
    brain.rewardCount.totGamesMaxReward.toFixed(2) +
    " - " +
    brain.rewardCount.totGamesMeanReward.toFixed(2), 110, 15);
}
