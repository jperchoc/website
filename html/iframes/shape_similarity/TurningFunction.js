function TurningFunction(array) {
  this.points = [];
  this.addPoint = function(length, angle) {
    this.points.push({
      len: length,
      angle: angle
    });
  }

  this.getNormalized = function(totalLength) {
    let nmTf = new TurningFunction();
    let sum = 0;
    for (let i=0; i< this.points.length; i++) {
      sum+=this.points[i].len;
    }
    let ratio = totalLength / sum;
    
    for (let i=0; i< this.points.length; i++) {
      nmTf.addPoint(ratio * this.points[i].len, this.points[i].angle);
    }
    return nmTf;
  }

  this.getValueAtPoint = function(x) {
    let val;
    let lastD = 0;
    for (let i = 0; i < this.points.length; i++) {
      let d = lastD + this.points[i].len;
      if (d > x || i === this.points.length - 1) {
        return this.points[i].angle;
      }
      lastD = d;
    }
    return val;
  }

  this.draw = function(x0, y0, xRatio, yRatio, r, g, b, drawGraph) {
    if (drawGraph) {
      this.drawGraph(x0, y0, xRatio, yRatio);
    }

    strokeWeight(3)
    stroke(r, g, b);
    let p0 = {x:x0, y:y0 + this.points[0].angle*yRatio};
    for(let i=0; i < this.points.length; i++) {
      let p1 = {x:p0.x + this.points[i].len*xRatio, y: y0 + this.points[i].angle*yRatio};
      line(p0.x,p0.y, p0.x, p1.y);
      line(p0.x,p1.y, p1.x, p1.y);
      p0 = p1;
    }
  }
  this.drawGraph = function(x0, y0, xRatio, yRatio) {
    strokeWeight(1)
    stroke(250);
    //Draw graph
    line(x0, y0-180*yRatio, x0, y0+180*yRatio);
    line(x0, y0, x0+xRatio, y0);
  }

  this.getSplitPoints = function(tf) {
    let splitPoints = [];
    let lastX = 0;
    splitPoints.push(lastX);
    
    for (let i=0; i< this.points.length; i++) {
      let sPoint = lastX + this.points[i].len;
      if (splitPoints.indexOf(sPoint) === -1) {
        splitPoints.push(sPoint);
      }
      lastX = sPoint;
    }
    lastX = 0;
    for (let i=0; i< tf.points.length; i++) {
      let sPoint = lastX + tf.points[i].len;
      if (splitPoints.indexOf(sPoint) === -1) {
        splitPoints.push(sPoint);
      }
      lastX = sPoint;
    }
    //Order split points
    splitPoints = splitPoints.sort((a, b) => a - b);
    return splitPoints;
  }
}
