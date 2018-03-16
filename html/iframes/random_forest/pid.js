class PIDData {

  constructor() {
    this.pidCat = ['Scale', 'Temora', 'Mysida', 'Anomura', 'Brachiolaria', 'Cumacea', 'Fish_egg', 'Candacia', 'Gebiidea', 'Chaetognatha'];
    this.classes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.pid = PIDDATA;
  }

  getLabel(i) {
    return this.pidCat[i];
  }

  converForRF(pidLine) {
    let RFObj = {params: {}, category: this.pidCat.indexOf(pidLine.category)};
    for(let i = 0; i < pidLine.params.length; i++) {
      RFObj.params[i] = pidLine.params[i];
    }
    return RFObj;
  }
  
  getItemsFromPid(n) {

    var result = new Array(n);

    let itmCats = [];
    for (let i = 0; i < this.classes.length; i++) {
      itmCats[i] = [];
    }
    for (let i = 0; i < this.pid.length; i ++) {
      let catStr = this.pid[i].category;
      let catIdx = this.pidCat.indexOf(catStr);
      itmCats[catIdx].push(this.converForRF(this.pid[i]));
    }

    for (let i = 0 ; i < n; i ++) {
      let cat = i % this.classes.length;
      let itm = random(itmCats[cat]);
      result[i] = itm;
     // itmCats[cat].splice(itmCats[cat].indexOf(itm), 1);
    }

    // var result = new Array(n),
    // len = this.pid.length,
    // taken = new Array(len);
    // if (n > len)
    //   throw new RangeError("getRandom: more elements taken than available");
    // while (n--) {
    //   var x = Math.floor(Math.random() * len);
    //   result[n] = this.converForRF(this.pid[x in taken ? taken[x] : x]);
    //   taken[x] = --len;
    // }
    return result;
  }
  
}

