let WIDTH = 550;
let HEIGHT = 500;

let RFmotor;
let generator = new PIDData();//new Generator();
let trained = false;
let createdTrees = 0;
let forestSize = 50;

let learningSet = []
let lsSize = Math.round(generator.pid.length * 0.7);//100;
let dataToPredict = [];
let predSize = Math.round(generator.pid.length * 0.3);//100;



let origX = 10;
let origY = 10;
let pbX = origX;
let pbY = origY;
let drawModulo = 1;
let offX = (WIDTH - 2 * pbX) / (forestSize/drawModulo);
let offY = 15;

let predicted = 0;
let err = 0;
let errDet = [];
let matrice = [];

function setup() {
  createCanvas(WIDTH, HEIGHT);
  background(0);
  initLearning();
  initDataToPredict();
  
  for(let i = 0; i < generator.classes.length; i++) {
    matrice[i] = [];
    for(let j = 0; j < generator.classes.length; j++) {
      matrice[i][j] = 0;
    }
  }
  for (let i =0; i < generator.classes.length; i ++) {
    errDet.push({label: generator.getLabel(i), nbTot:0, nbErr: 0});
  }

  window.addEventListener('treecreated', function (e) {
    let g = map(createdTrees, 0, forestSize, 100, 255);
    fill(100, g, 100);
    stroke(100, g, 100);
    if (createdTrees%drawModulo === 0) {
      rect(pbX, pbY, offX, 7.6);
      pbX += offX; 
    }
    stroke(0);
  });
  RFmotor = new RandomForest(learningSet, generator.classes);
}

let yB2 = 0;
function draw() {
  fill(255);
  if (!trained) {
    if (createdTrees >= forestSize) {
      trained = true;
      pbY += 2*offY;
      text('End of training.', origX, pbY);
      pbY += offY;
      text('Evaluating training...', origX, pbY);
      let confData = RFmotor.evaluateCrossValidation(1, 5);
      drawMatrice(confData.data, 260, 35);
      console.log(confData);
      //pbY = 190;
      yB2 = pbY;
      pbY += 30;
      pbX = 10;
      text('Predicting data.', origX, pbY);
      
    } else {
      RFmotor.train();
      createdTrees++;
    }
  } else {
    if (predicted < dataToPredict.length) {

      let g = map(predicted, 0, dataToPredict.length, 100, 255);
      fill(100, g, 100);
      stroke(100, g, 100);
      if (predicted%drawModulo === 0) {
        rect(pbX, yB2, ((WIDTH - 20) / (dataToPredict.length/drawModulo))-1, 7.6);
        pbX += (WIDTH - 20) / (dataToPredict.length/drawModulo); 
      }
      stroke(0);
      fill(255);

      let result = RFmotor.predict(dataToPredict[predicted]);
      matrice[dataToPredict[predicted].category][result]++;
      errDet[dataToPredict[predicted].category].nbTot++;
      if (result !== dataToPredict[predicted].category) {
        err++;
        errDet[dataToPredict[predicted].category].nbErr++;
        pbY += offY;
        text('Pred failed : ' + generator.getLabel(result) + ' instead of ' + generator.getLabel(dataToPredict[predicted].category), origX, pbY);
      }
      predicted++;
    } else {
      pbY += 2*offY;
      drawMatrice(matrice, 260, yB2 + 30);
      stroke(255);
      text("Error : " + err + '/' + dataToPredict.length + ' (' + (err*100/dataToPredict.length).toFixed(2) + '%)', origX + 100, yB2 + 30);
      console.log(errDet);
      noLoop();
    }
  }
}

function drawMatrice(data, x, y) {
  let origx = x;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (i != j && data[i][j] !== 0) fill(200, 100, 100);
      else if (i==j)  fill(100, 200, 100);
      else fill(255);
      let offsetX = (data[i][j] < 10) ? 8 : 0;
      text(data[i][j].toFixed(), x + offsetX, y);
      x += 25;
    }
    y += 20;  
    x = origx;
  }
  pbY = y + 10;
  fill(255);
}

function initLearning() {
  learningSet = generator.getItemsFromPid(lsSize);
  /*for (let i = 0; i < lsSize; i++)
    learningSet.push(generator.generate());
    */
}

function initDataToPredict() {
  dataToPredict = generator.getItemsFromPid(predSize);
  // for (let i = 0; i < predSize; i++)
  // dataToPredict.push(generator.generate());
}
