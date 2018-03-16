function getShapeSimilarity(s1, s2, options) {
  let maxSim = {value:-5, tf1:null, tf2: null, turningArrays: null};
  let shape1 = new Shape(s1);
  let shape2 = new Shape(s2);
  let normalize = options.normalize ? options.normalize : 1;
  let precision = options.precision ? options.precision : 1;
  //let tf2 = shape2.getTurningFunction().getNormalized(normalize);
  for (let i = 0; i < shape1.getSequences().length; i++) {
    let tf1 = shape1.getTurningFunction(shape1.getSequences()[i]).getNormalized(normalize);
    for (let j = 0; j < shape2.getSequences().length; j++) {
      let tf2 = shape2.getTurningFunction(shape2.getSequences()[j]).getNormalized(normalize);
      let turningArrays = getTurningArrays(tf1, tf2, normalize, precision);
      let similarity = MathTools.cosineSimilarity(turningArrays[0], turningArrays[1]);
      if (similarity > maxSim.value) {
        maxSim.value = similarity;
        maxSim.tf1 = tf1;
        maxSim.tf2 = tf2;
        maxSim.turningArrays = turningArrays;
      }
    }
  }

  if (options.drawGraphs) {
    maxSim.tf1.draw(options.x0, options.y0, options.xRatio, options.yRatio, options.color1.r, options.color1.g, options.color1.b, true);
    maxSim.tf2.draw(options.x0, options.y0, options.xRatio, options.yRatio, options.color2.r, options.color2.g, options.color2.b, false);
  }
  if (options.drawDiff) {
    drawDifference(maxSim.turningArrays, normalize, precision, options.x0, options.y0, options.xRatio, options.yRatio, options.color3);
  }
  return maxSim.value;
}



function getTurningArrays(tf1, tf2, normalize, precision) {
  let step = normalize/precision;
  let arrayTF1 = [];
  let arrayTF2 = [];
  for (let i = 0; i <= 1; i+=step) {
    let tf1Val = tf1.getValueAtPoint(i);
    let tf2Val = tf2.getValueAtPoint(i);
    arrayTF1.push(tf1Val);
    arrayTF2.push(tf2Val);   
  }
  return [arrayTF1, arrayTF2];
}

function drawDifference(turningArrays, normalize, precision, originX, originY, xRatio, yRatio, color) {
  strokeWeight(1)
  fill(color.r, color.g, color.b, color.a);
  noStroke();

  let step = normalize/precision;
  let idx = 0;
  for (let i = 0; i < 1; i+=step) {
    let x0 = originX + (step*idx) * xRatio;
    let x1 = originX + ((step*idx)+step) * xRatio;
    let y0 = originY;
    let h = turningArrays[0][idx] - turningArrays[1][idx];
    idx++;
    rect(x0, y0, x1-x0, h*0.5*yRatio);
  }
}

