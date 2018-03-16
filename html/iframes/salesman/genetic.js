function Genetic(MUTATION_CHANCE, KEEP_ELITE_PERCENT, LOOP) {
  //////////////// VARS /////////////////////
  this.nbSpots = 0;
  this.Spots = [];
  this.bestPath = [];
  this.sizePool = 0;
  this.pool = [];
  this.initialMutateChance = MUTATION_CHANCE;
  this.mutateChance = MUTATION_CHANCE;
  this.keepElitePercent = KEEP_ELITE_PERCENT;
  this.gen = 0;
  this.loop = LOOP;

  //////////////// PUBLIC /////////////////////
  this.createSpots = function(nbSpots) {
    this.nbSpots = nbSpots;
    this.Spots = [];
    for (var i = 0; i < nbSpots; i++) {
      this.Spots.push({
        x: random(width),
        y: random(height)
      });
    }
  };
  this.minDist = 9999999999999;
  this.lastGen = 0;
  this.cntEvolveMutate = 0;
  this.draw = function() {
    this.bestPath = this._getBest();
    if (this.bestPath.dist < this.minDist) {
      //console.log("Evolve from " + this.minDist.toFixed(2) + " to " + this.bestPath.dist.toFixed(2) + " at generation " + this.gen + " (previous at gen " + this.lastGen + ")");
      this.minDist = this.bestPath.dist;
      this.lastGen = this.gen;
      this.cntEvolveMutate = 0;
      this.mutateChance = this.initialMutateChance;
    } else if (this.cntEvolveMutate >= 100) {
      this.cntEvolveMutate = 0;
      this.mutateChance = Math.min(this.mutateChance + 1, 100);
    } else {
      this.cntEvolveMutate++;
    }
    background(220);
    stroke(200, 150, 150);
    strokeWeight(2);
    beginShape();
    fill(100, 200, 200, 50)
    for (let i = 0; i < this.nbSpots - 1; i++) {
      line(this.bestPath.path[i].x, this.bestPath.path[i].y, this.bestPath.path[i + 1].x, this.bestPath.path[i + 1].y);
      vertex(this.bestPath.path[i].x, this.bestPath.path[i].y);
      vertex(this.bestPath.path[i + 1].x, this.bestPath.path[i + 1].y);
    }
    if (this.loop) {
      line(this.bestPath.path[this.nbSpots - 1].x, this.bestPath.path[this.nbSpots - 1].y, this.bestPath.path[0].x, this.bestPath.path[0].y);
      vertex(this.bestPath.path[this.nbSpots - 1].x, this.bestPath.path[this.nbSpots - 1].y);
      vertex(this.bestPath.path[0].x, this.bestPath.path[0].y);
    }
    endShape(CLOSE);
    stroke(200);
    fill(100, 100, 220);
    strokeWeight(1);
    for (let i = 0; i < this.nbSpots; i++) {
      ellipse(this.Spots[i].x, this.Spots[i].y, 10, 10);
    }
    stroke(200);
    fill(10);
    textSize(20);
    text("Dist : " + this.bestPath.dist.toFixed(2), 10, height - 50);
    text("Gen : " + this.gen /*+ ' (' + this.pool[0].dist.toFixed(2) + ' - ' + this.pool[this.sizePool - 1].dist.toFixed(2) + ')'*/, 10, height - 30);
    text("Mutate : " + this.mutateChance + '%', 10, height - 10);
  }

  this.createPool = function(sizePool) {
    this.minDist = 9999999999999;
    this.lastGen = 0;
    this.sizePool = sizePool;
    this.pool = [];
    this.gen = 0;
    this.cntEvolveMutate = 0;
    for (let i = 0; i < sizePool; i++) {
      let path = shuffle(this.Spots);
      this.pool.push({
        path: path,
        dist: this._computeDistance(path)
      });
    }
  }

  this.evolve = function() {
      //step 1 : on elimine les plus faibles
      this.pool = this.pool.slice(0, Math.floor(this.pool.length * this.keepElitePercent / 100));
      //step 2 : on crée de nouveaux à partir d'anciens
      let elite = this.pool.length;
      while (this.pool.length < this.sizePool) {
        //step 2.5 : on mute aléatoirement
        let p1 = this.pool[Math.round(random(elite - 1))];
        let p2 = this.pool[Math.round(random(elite - 1))];
        //crossover
        let childPath = this._createChild(p1, p2);
        //mutation
        if (random(100) < this.mutateChance) {
          this._mutateChild(childPath);
        }
        this.pool.push({
          path: childPath,
          dist: this._computeDistance(childPath)
        });
      }
      this.gen++;
    }
    //////////////// PRIVATE /////////////////////
  this._mutateChild = function(child) {
    let mutateMode = Math.round(random(100));
    if (mutateMode > 75) {
      //swap two neighbours
      let split = Math.round(random(this.nbSpots - 1));
      if (split == 0) {
        split++;
      }
      let tmp = child[split];
      child[split] = child[split - 1];
      child[split - 1] = tmp;
    } else if (mutateMode > 50) {
      //swap two randoms spots
      let split1 = Math.round(random(this.nbSpots - 1));
      let split2 = Math.round(random(this.nbSpots - 1));
      let tmp = child[split1];
      child[split1] = child[split2];
      child[split2] = tmp;
    } else if (mutateMode > 25) {
      //move item
      let split1 = Math.round(random(this.nbSpots - 2));
      let tmp = child[split1];
      for (let i = split1; i < this.nbSpots - 1; i++) {
        child[i] = child[i + 1]
      }
      child[this.nbSpots - 1] = tmp;
    } else {
      //reverse range
      let split1 = Math.round(random(this.nbSpots - 1));
      let split2 = Math.round(random(this.nbSpots - 1));
      if (split1 > split2) {
        let tmp = split1;
        split1 = split2;
        split2 = tmp;
      }
      let reversePart = child.slice(split1, split2).reverse();
      Array.prototype.splice.apply(child, [split1, reversePart.length].concat(reversePart));
    }
  }
  this._computeDistance = function(path) {
    var d = 0;
    for (let j = 0; j < this.nbSpots - 1; j++) {
      d += sqrt(pow((path[j + 1].y - path[j].y), 2) + pow(path[j + 1].x - path[j].x, 2));
    }
    if (this.loop) {
      d += sqrt(pow((path[0].y - path[this.nbSpots - 1].y), 2) + pow(path[0].x - path[this.nbSpots - 1].x, 2));
    }
    return d;
  }

  this._getBest = function() {
    this.pool.sort(function(a, b) {
      return (a.dist > b.dist) ? 1 : ((b.dist > a.dist) ? -1 : 0);
    });
    return this.pool[0];
  }

  this._createChild = function(parent1, parent2) {
    let child = [];
    let startPos = Math.round(random(this.nbSpots - 1));
    let endPos = Math.round(random(this.nbSpots - 1));;
    // Loop and add the sub tour from parent1 to our child
    for (let i = 0; i < this.nbSpots; i++) {
      // If our start position is less than the end position
      if (startPos < endPos && i > startPos && i < endPos) {
        child[i] = parent1.path[i];
      } // If our start position is larger
      else if (startPos > endPos) {
        if (!(i < startPos && i > endPos)) {
          child[i] = parent1.path[i];
        }
      }
    }
    // Loop through parent2's city tour
    for (let i = 0; i < this.nbSpots; i++) {
      // If child doesn't have the city add it
      if (child.indexOf(parent2.path[i]) == -1) {
        // Loop to find a spare position in the child's tour
        for (let ii = 0; ii < this.nbSpots; ii++) {
          // Spare position found, add city
          if (typeof child[ii] == 'undefined') {
            child[ii] = parent2.path[i];
            break;
          }
        }
      }
    }
    return child;
  }
}