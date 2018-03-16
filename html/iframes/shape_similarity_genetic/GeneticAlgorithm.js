class GeneticAlgorithm {
  
  constructor(parent) {
    this.parent = parent;
    this.pool = [];
    this.gen = 0;
  }

  getBest() {
    let maxScore = -1;
    let idx = -1;
    let sum = 0.0;
    for (let i = 0; i < this.pool.length; i++) {
      sum += this.pool[i].score;
      if (this.pool[i].score > maxScore) {
        maxScore = this.pool[i].score;
        idx = i;
      }
    }
    this.average = sum / this.pool.length;
    return this.pool[idx];
  }
  
  getAverage() {
    return this.average;
  }

  getGen() {
    return this.gen;
  }

  getNextGen() {
    //Selection
    this.selectBestFromGen();
    //CrossOver
    this.createFromBest()
    //Mutation
    this.mutate();
    //Evaluation
    this.evaluatePool();
    this.gen++;
  }

  generateInitialPool() {
    console.log("Err: please override generateInitialPool function");
  }

  evaluatePool() {
    console.log("Err: please override evaluatePool function");
  }

  selectBestFromGen() {
    console.log("Err: please override selectBestFromGen function");
  }


  createFromBest() {
    console.log("Err: please override createFromBest function");
  }

  mate(p1, p2) {
    console.log("Err: please override mate function");
  }

  mutate() {
    console.log("Err: please override mutate function");
  }

  copyItem(a) {
    return JSON.parse(JSON.stringify(a));
  }
}
