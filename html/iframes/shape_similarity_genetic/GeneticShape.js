class GeneticShape {
  constructor(shapeCible, xCanvas, yCanvas, popSize, mutateRate) {
    this.shapeCible = shapeCible;
    this.POP_SIZE = popSize;
    this.MUTATE_RATE = mutateRate;
    this.xCanvas = xCanvas;
    this.yCanvas = yCanvas;
    this.mutateMethods = [];

    this.genetic = new GeneticAlgorithm(this);

    this.genetic.generateInitialPool = this.generateInitialPool;
    this.genetic.evaluatePool = this.evaluatePool;
    this.genetic.selectBestFromGen = this.selectBestFromGen;
    this.genetic.createFromBest = this.createFromBest;
    this.genetic.mate = this.mate;
    this.genetic.mutate = this.mutate;
    this.mutateMethods.push(this.mutate_deletePoint);
    this.mutateMethods.push(this.mutate_addPoint);
    this.mutateMethods.push(this.mutate_switchPoints);
    this.mutateMethods.push(this.mutate_generateRandomShape);
    this.mutateMethods.push(this.mutate_moveX);
    this.mutateMethods.push(this.mutate_moveY);

    this.genetic.generateInitialPool();
  }

  getBestShape() {
    return this.genetic.getBest();
  }
  
  getAverage() {
    return this.genetic.getAverage();
  }

  getGen() {
    return this.genetic.getGen();
  }

  getPool() {
    return this.genetic.pool;
  }

  getNextGen() {
    return this.genetic.getNextGen();
  }

  generateInitialPool() {
    this.pool = [];
    for (let i = 0; i < this.parent.POP_SIZE; i++) {
      let minPoints = Math.max(3, this.parent.shapeCible.points.length - 3);
      let maxPoints = this.parent.shapeCible.points.length + 5;
      this.pool[i] = GeneticShape.generateRandomShape(minPoints, maxPoints, this.parent.xCanvas, this.parent.yCanvas);
    }
    this.evaluatePool();
  }

  evaluatePool() {
    for (let i = 0; i < this.pool.length; i++) {
      this.pool[i].score = ShapeSimilarity.getShapeSimilarity(
        this.parent.shapeCible.points, 
        this.pool[i].points
      );
    }  
    //Order by score
    this.pool = this.pool.sort((a, b) => {return  b.score - a.score});
  }

  selectBestFromGen() {
    let seuil = Math.ceil(this.parent.POP_SIZE * 0.25);
    this.genBest = [];
    for (let i = 0; i < seuil; i++) {
      this.genBest[i] = this.copyItem(this.pool[i]);
    }
  }

  createFromBest() {
    this.pool = [];
    for (let i =0; i< this.genBest.length; i++) {
      this.pool[i] = this.copyItem(this.genBest[i]);
    }
    while (this.pool.length < this.parent.POP_SIZE) {
      this.pool.push(this.mate(random(this.genBest), random(this.genBest)));
    }
  }

  mate(p1, p2) {
    let lp1 = p1.points.length;
    let lp2 = p2.points.length;

    let minL = Math.min(lp1, lp2);
    let maxL = Math.max(lp1, lp2);

    let childLength = Math.round(random(minL, maxL));
    let child = {points:[]};

    let sp1, sp2;
    do {
    sp1 = Math.round(random(childLength));
    sp2 = Math.round(random(childLength));
    } while(sp1 === sp2);
    
    if (sp1 > sp2) {
      let tmp = sp1;
      sp1 = sp2;
      sp2 = tmp;
    }

    for(let i = 0; i < childLength; i++) {
      let chromosomeP1Index = Math.min(lp1-1, Math.round(map(i, 0, childLength, 0, lp1)));
      let chromosomeP2Index = Math.min(lp2-1, Math.round(map(i, 0, childLength, 0, lp2)));
      let c1 = p1.points[chromosomeP1Index];
      let c2 = p2.points[chromosomeP2Index];
      if (i >= sp1 && i <= sp2) {
        child.points.push(c1);
      } else {
        child.points.push(c2);
      }
    }
    return child;
  }

  mutate() {
    if (random(100) > this.parent.MUTATE_RATE) {
      let mutated = random(this.pool);
      if (this.pool.indexOf(mutated) === 0) {
        console.log("Don't mutate best !")
        return;
      }
      random(this.parent.mutateMethods)(this.parent, mutated);
    }
  }

  mutate_deletePoint(data, itm) {
    if (itm.points.length > 3) {
      let remove = random(itm.points);
      itm.points.splice(itm.points.indexOf(remove), 1);
    }
  }
  mutate_addPoint(data, itm) {
    itm.points.push({
      x: random(data.xCanvas),
      y: random(data.yCanvas)
    });
  }
  mutate_switchPoints(data, itm) {
    let a = random(itm.points);
    let b = itm.points[itm.points.indexOf(a) - 1];
    let c = itm.points[itm.points.indexOf(a) + 1];
    let d = random([b,c]);
    if(d) {
      let idxA = itm.points.indexOf(a);
      let idxB = itm.points.indexOf(d);
      itm.points[idxA] = d;
      itm.points[idxB] = a;
    }
  }
  mutate_generateRandomShape(data, itm) {
    let minPoints = Math.max(3, data.shapeCible.points.length - 3);
    let maxPoints = data.shapeCible.points.length + 5;
    itm = GeneticShape.generateRandomShape(minPoints, maxPoints, data.xCanvas, data.yCanvas);
  }
  mutate_moveX(data, itm) {
    let m = random(itm.points);
    m.x = Math.max(Math.min(m.x + random(-50, 50), data.xCanvas), 0);
  }
  mutate_moveY(data, itm) {
    let m = random(itm.points);
    m.y = Math.max(Math.min(m.y  + random(-50, 50), data.yCanvas), 0);
  }

  static generateRandomShape(minPoints, maxPoints, xCanvas, yCanvas) {
    let shape = {
      points: []
    };
    let nPoints = Math.floor(random(minPoints, maxPoints));
    for (let i = 0; i < nPoints; i++) {
      shape.points[i] = {
        x: random(0, xCanvas),
        y: random(0, yCanvas),
      };
    }
    return shape;
  }
}
