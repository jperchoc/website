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
