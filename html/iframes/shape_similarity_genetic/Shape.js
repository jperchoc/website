class Shape {

  /**
   * Create a shape object
   * @param {*Array of points} array 
   */  
  constructor(array) {
    this.points = array;
    this._sequences = [];
  }
 
  /**
   * Get each possible sequence of points for the shape
   */
  getSequences() {
    if (this._sequences.length === 0) {
      this._sequences = [];
      for (let i = 0; i < this.points.length; i++) {
        let sequenceSens1 = [];
        let sequenceSens2 = [];
        for (let j = 0; j < this.points.length; j++) {
          let indexSens1 = (i + j)%this.points.length;
          let indexSens2 = (i - j)%this.points.length;
          if (indexSens2 < 0) indexSens2 = this.points.length + indexSens2;
          sequenceSens1.push(this.points[indexSens1]);
          sequenceSens2.push(this.points[indexSens2]);
        }
        this._sequences.push(sequenceSens1);
        this._sequences.push(sequenceSens2);
      }
    }
    return this._sequences;
  }
  
  /**
   * Get the turning function of a point sequence
   * @param {*Array of points} sequence 
   */
  getTurningFunction(sequence) {
    if (!sequence) {
      sequence = this.points;
    }
    let tf = new TurningFunction();
    for (let i = 0; i < sequence.length; i++) {
      let p1 = sequence[i];
      let p2 = (i === sequence.length -1) ? sequence[0] : sequence[i+1];
      tf.addPoint(MathTools.getLength(p1, p2), MathTools.getAngle(p1, p2));
    }
    return tf;
  }
}
