class ShapeSimilarityOptions {
  /**
   * 
   * @param {*Value to normalize total shape's length. Default value:1} normalize 
   * @param {*Arrays precision points. Default value:100} precision 
   * @param {*Draw or not curves graphs} drawGraphs 
   * @param {*Draw or not curves difference graph} drawDiff 
   * @param {*Curve 1 color} color1 
   * @param {*Curve 2 color} color2 
   * @param {*Curve 3 color} color3 
   * @param {*X value of graph} x0 
   * @param {*Y value of graph} y0 
   * @param {*xRatio} xRatio 
   * @param {*yRatio} yRatio 
   */
  constructor(
    normalize = 1,
    precision = 100,
    drawGraphs = false,
    drawDiff = true,
    x0 = 0,
    y0 = 200,
    color1 ={r:250, g: 125, b:100, a:255},
    color2={r:125, g: 250, b:100, a:255},
    color3={r:200, g: 200, b:250, a:125},
    xRatio=150,
    yRatio=0.5
  ) {
    this.normalize = normalize;
    this.precision = precision;
    this.drawGraphs = drawGraphs;
    this.drawDiff = drawDiff;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
    this.x0 = x0;
    this.y0 = y0;
    this.xRatio = xRatio;
    this.yRatio = yRatio;
  }
}
