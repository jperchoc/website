class ShapeSimilarity {
  /**
   * 
   * @param {*Array of points representing shape 1} s1 
   * @param {*Array of points representing shape 2} s2 
   * @param {*Options} options 
   */
  static getShapeSimilarity(s1, s2, options = new ShapeSimilarityOptions()) {
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
        let turningArrays = ShapeSimilarity.getTurningArrays(tf1, tf2, normalize, precision);
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
      ShapeSimilarity.drawGraph(options);
      ShapeSimilarity.drawTF(maxSim.tf1, options, options.color1);
      ShapeSimilarity.drawTF(maxSim.tf2, options, options.color2);
      if (options.drawDiff) {
        ShapeSimilarity.drawDifference(maxSim.turningArrays, normalize, precision, options, options.color3);
      }
    }
    return map(maxSim.value, 0, 1, 0, 100);
  }

  /**
   * Creates two arrays containing each turning function value
   * at each normalize/precision point
   * @param {*Turning function 1} tf1 
   * @param {*Turning function 1} tf2 
   * @param {*Normalization value} normalize 
   * @param {*Precision value} precision 
   */
  static getTurningArrays(tf1, tf2, normalize, precision) {
    let step = normalize/precision;
    let arrayTF1 = [];
    let arrayTF2 = [];
    for (let i = 0; i <= normalize; i+=step) {
      let tf1Val = tf1.getValueAtPoint(i);
      let tf2Val = tf2.getValueAtPoint(i);
      arrayTF1.push(tf1Val);
      arrayTF2.push(tf2Val);   
    }
    return [arrayTF1, arrayTF2];
  }

  /**
   * Draw the turning function of a shape
   * @param {*Turning function} tf 
   * @param {*Drawing options} options 
   * @param {*Curve color} color 
   */
  static drawTF(tf, options, color) {
    strokeWeight(3)
    stroke(color.r, color.g, color.b);
    let p0 = {
      x: options.x0, 
      y: options.y0 + tf.points[0].angle * options.yRatio
    };
    for(let i=0; i < tf.points.length; i++) {
      let p1 = {
        x: p0.x + tf.points[i].len * options.xRatio, 
        y: options.y0 + tf.points[i].angle * options.yRatio
      };
      line(p0.x, p0.y, p0.x, p1.y);
      line(p0.x, p1.y, p1.x, p1.y);
      p0 = p1;
    }
  }

  /**
   * Draw the graph
   * @param {*Drawing options} options 
   */
  static drawGraph(options) {
    strokeWeight(1)
    stroke(250);
    //Draw graph
    line(options.x0, options.y0 - 180 * options.yRatio, options.x0, options.y0 + 180 * options.yRatio);
    line(options.x0, options.y0, options.x0 + options.xRatio, options.y0);
  }

  /**
   * Draw the difference between two turning functions
   * @param {*Turning function's arrays} turningArrays 
   * @param {*Normalized value} normalize 
   * @param {*Precision value} precision 
   * @param {*Drawing options} options 
   * @param {*Difference curve color} color 
   */
  static drawDifference(turningArrays, normalize, precision, options, color) {
    strokeWeight(1)
    fill(color.r, color.g, color.b, color.a);
    noStroke();

    let step = normalize/precision;
    let idx = 0;
    for (let i = 0; i < normalize; i+=step) {
      let x0 = options.x0 + (step*idx) * options.xRatio;
      let x1 = options.x0 + ((step*idx)+step) * options.xRatio;
      let y0 = options.y0;
      let h = turningArrays[0][idx] - turningArrays[1][idx];
      idx++;
      rect(x0, y0, x1-x0, h * 0.5 * options.yRatio);
    }
  }
}

