class MathTools {
  /**
   * Get the distance between two points
   * @param {*Point 1} p1 
   * @param {*Point 2} p2 
   */
  static getLength(p1, p2) {
  return Math.sqrt(Math.pow((p1.x-p2.x),2) + Math.pow((p1.y-p2.y),2));
  }

  /**
   * Get the angle between two points
   * @param {*Point 1} p1 
   * @param {*Point 2} p2 
   */
  static getAngle(p1, p2) {
    let deltaY = p2.y - p1.y
    let deltaX = p2.x - p1.x
    let angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / PI
    return angleInDegrees;
  }

  /**
   * Computes the similarity between two arrays.
   * @param {*Array 1} arr1 
   * @param {*Array 2} arr2 
   */
  static cosineSimilarity(arr1, arr2) {
    let sumAB = 0;
    let sumA2 = 0;
    let sumB2 = 0;
    
    for (let i = 0; i < arr1.length; i++) {
      sumAB += (arr1[i] * arr2[i]);
      sumA2 += Math.pow(arr1[i], 2);
      sumB2 += Math.pow(arr2[i], 2);
    }
    let sim = (sumA2 + sumB2 === 0) ? -1 : sumAB/(Math.sqrt(sumA2)*Math.sqrt(sumB2));
    return sim;
  }
}
