class RandomForest {
  constructor(learning, classes, percentParam = -1) {
    this._forest = [];
    this._nParameters = Object.keys(learning[0].params).length;
    this._categories = classes;
    this._subSampleSize = Math.round(0.64 * learning.length);
    this._numberRandomParameters = 
      (percentParam === -1)  ? 
        Math.round(Math.sqrt(this._nParameters)) 
        : 
        Math.round(percentParam/100.0 * this._nParameters);
    this._percentParam = percentParam;
    this._learning = learning;

  }

  train() {
    this._populateForest(1, this._learning, true);
  }

  predict(sample) {
    let counter = [];
    for (let i = 0; i < this._categories.length; i++) 
      counter[i] = 0;
    for (let i = 0; i < this._forest.length; i++) {
      let predictedCategory = this._getCategoryFromTree(this._forest[i], this._arrayFromParams(sample.params));
      counter[this._categories.indexOf(predictedCategory)]++;
    }
    let maxPredicted = -1;
    let nPredicted = -1;
    for(let i = 0; i < this._categories.length; i++) {
      if (counter[i] > nPredicted) {
        maxPredicted = i;
        nPredicted = counter[i];
      }
    }
    return maxPredicted;
  }

  evaluateCrossValidation(itterations, forestSize) {
    let matrice = {
      data: []
    };

    for(let i = 0; i < this._categories.length; i++) {
      matrice.data[i] = [];
      for(let j = 0; j < this._categories.length; j++) {
        matrice.data[i][j] = 0;
      }
    }

    for (let itt = 0; itt < itterations; itt++) {
      //Randomize learning and split it in two arrays
      let randomizedLearning = this._shuffleArray(this._learning);
      let arrA = [];
      let arrB = [];
      let splitpoint = randomizedLearning.length * 0.6;
      for (let i = 0; i < randomizedLearning.length; i++) {
        if (i < splitpoint) arrA.push(randomizedLearning[i]);
        else arrB.push(randomizedLearning[i]);
      }
      //Predict A with B as learning set
      let RFA = new RandomForest(arrB, this._categories, this._percentParam);
      for (let i = 0; i < forestSize; i++) {
        RFA._populateForest(1, arrB, false);
      }
      for (let i = 0; i < arrA.length; i++) {
        let result = RFA.predict(arrA[i]);
        matrice.data[arrA[i].category][result]++;
      }
      //Predict B with A as learning set
      let RFB = new RandomForest(arrA, this._categories, this._percentParam);
      for (let i = 0; i < forestSize; i++) {
        RFB._populateForest(1, arrA, false);
      }
      for (let i = 0; i < arrB.length; i++) {
        let result = RFB.predict(arrB[i]);
        matrice.data[arrB[i].category][result]++;
      }
    }
    return matrice;
  }

  /********************************************************************************/
  /*                                 PRIVATE                                      */
  /********************************************************************************/
  _getCategoryFromTree(node, data) {
    if (node.category != undefined) return node.category;
    let f = this._cosineSimilarity(data, node.classifier, node.paramThreshold);
    if (f > node.threshold) 
      return this._getCategoryFromTree(node.left, data);
    else
      return this._getCategoryFromTree(node.right, data);
  }

  _populateForest(forestSize, learning, dispatchEvent = false) {
    for (let i = 0; i < forestSize; i++) {
      this._forest.push(this._createTree(learning));
      if (dispatchEvent) 
        window.dispatchEvent(new CustomEvent('treecreated'));
    }
  }

  _createTree(learning) {
    let subSample = this._getRandom(learning, this._subSampleSize);
    let node = this._nodeFactory(subSample);
    if (node.category === undefined) {
      this._makeLeftAndRightNodes(node, subSample);
    }
    return node;
  }

  _nodeFactory(subSample) {
    let node = {};
    if (subSample.length === 1) {
      node.category = subSample[0].category;
    } else {
      let param = [];
      let c = 0;
      do {
        let randomParamIdx = Math.round(random(this._nParameters));
        if (param.indexOf(randomParamIdx) === -1) {
          c++;
          param.push(randomParamIdx);
        }
      } while (c < this._numberRandomParameters);
      node.paramThreshold = param;
      node.classifier = this._makeClassifier(subSample);
      node.threshold = this._getThreshold(subSample, node);
    }
    return node;
  }

  _makeLeftAndRightNodes(node, subSample) {
    let indicator = this._createIndicator(node, subSample);

    let left = [];
    let right = [];
    for (let i = 0; i < indicator.length; i++) {
      if (indicator[i] > 0) {
        left.push(subSample[i]);
      } else {
        right.push(subSample[i]);
      }
    }
    node.left = this._nodeFactory(left);
    node.right = this._nodeFactory(right);
    if (node.left.category === undefined) 
      this._makeLeftAndRightNodes(node.left, left);
    if (node.right.category === undefined) 
      this._makeLeftAndRightNodes(node.right, right);
  }

  _createIndicator(node, subSample) {
    let indicator = [];
    let cnt = 0;
    for(let i = 0; i < subSample.length; i++) {
      let f = this._cosineSimilarity(this._arrayFromParams(subSample[i].params), node.classifier, node.paramThreshold);
      indicator[cnt] = f >= node.threshold ? 1 : 0;
      cnt++;
    }
    //Infinite loop if indicator is all the same value
    let isSameValue = true;
    let val = indicator[0];
    for (let i = 0; i < subSample.length; i++) {
      if (val !== indicator[i]) {
        isSameValue = false;
        break;
      }
    }
    if (isSameValue) indicator[0] = val === 0 ? 1 : 0;
    return indicator;
  }

  _makeClassifier(subSample) {
    let categoryCount = [];
    for (let i = 0 ; i < this._categories.length; i++) 
      categoryCount.push(0);
    //On compte le nombre de fois que chaque classe apparaît dans les échantillons passés en paramètres (histogramme)
    for (let i = 0; i < subSample.length; i++) {
      let idx = this._categories.indexOf(subSample[i].category);
      categoryCount[idx]++;
    }
    //On récupère la catégorie la plus représentée dans la liste d'échantillons
    let mostRepresentative = -1;
    let nb = -1;
    for (let i = 0; i < categoryCount.length; i++) {
      if (categoryCount[i] > nb) {
        nb = categoryCount[i];
        mostRepresentative = i;
      }
    }
    //On récupère les échantillons correcpondants a la classe la plus représentative
    let vectors = [];
    for (let i = 0; i <  subSample.length; i++) {
      if (subSample[i].category === mostRepresentative) {
        vectors.push(subSample[i]);
      }
    }
    //On crée le classifier : pour chaque paramètre, on calcule la somme des valeurs de ce paramètre parmis les échantillons du tableau vectors
    let classifier = [];
    for (let i = 0; i < this._nParameters; i++) {
      classifier[i] = 0;
    }
    for (let i = 0; i < this._nParameters; i++) {
      for(let j = 0; j < vectors.length; j++) {
        classifier[i] += this._arrayFromParams(vectors[j].params)[i];
      }
    }
    if (this.moyennageClassfier) {
      for (let i = 0; i < classifier.length; i++) 
        classifier[i] /= vectors.length;
    }
    return classifier;
  }

  _getThreshold(subSample, node) {
    let fmin = 100000;
    let fmax = -1;
    for (let i = 0; i < subSample.length; i++) {
      let f = this._cosineSimilarity(this._arrayFromParams(subSample[i].params), node.classifier, node.paramThreshold);
      if (f < fmin)
      fmin = f;
      if (f > fmax)
          fmax = f;
    }
    return (fmax + fmin) / 2.0;
  }

  _arrayFromParams(params) {
    let a = [];
    for (let property in params) {
      a.push(params[property]);
    } 
    return a;
  }

  _cosineSimilarity(s1, s2, indexes) {
    let product = 0.0;
    let sqr1 = 0.0;
    let sqr2 = 0.0;
    for (let i = 0; i < indexes.length; i++) {
      let idx = indexes[i];
      product += s1[idx] * s2[idx];
      sqr1 += s1[idx] * s1[idx];
      sqr2 += s2[idx] * s2[idx];
    }
    return product / (Math.sqrt(sqr1) * Math.sqrt(sqr2));
  }

  _getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;
  }

  _shuffleArray(originalArray) {
    var array = [].concat(originalArray);
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}
