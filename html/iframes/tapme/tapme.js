class TapMe {
  constructor(fps) {
    this.fps = fps;
    this.timeBarInSeconds = 1.3;
    this.items = {
      buttons: ['B1', 'B2', 'B3'],
      colors: [
        {name:'rouge', color: '#dd5555'},
        {name:'vert', color: '#55cc55'},
        {name:'bleu', color: '#5555dd'},
      ]
    }
    this.reset();
  }

  draw() {
    if (this.gameOver) {
      textSize(32);
      background(0);
      fill(255);
      textAlign(CENTER, CENTER);
      text('GAME OVER', WIDTH/2, HEIGHT/2.5);
      textSize(16);
      textAlign(CENTER, CENTER);
      text('Score : ' + this.score, WIDTH/2, HEIGHT/2);
    } else {
      //draw progressbar backgournd
      fill(200);
      stroke(0);
      strokeWeight(1);
      rect(10, 10, 380, 20);
      //draw progressbar foreground
      noStroke();
      let w = this.timeLeft * 379 / this.totalTime;
      fill(50, 200, 50);
      rect(11, 11, w, 19);
      //draw instruction
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(16);
      text(this.instruction, WIDTH/2, 65);

      let buttonHeight = 85;
      let buttonSpace = 15;

      //draw button 1
      fill(this.frameItems.colors[0].color);
      rect(10, 90, 380, buttonHeight);
      fill(255);
      text(this.frameItems.buttons[0], 380/2, 90 + buttonHeight/2);

      //draw button 2
      fill(this.frameItems.colors[1].color);
      rect(10, 90 + buttonSpace + buttonHeight, 380, buttonHeight);
      fill(255);
      text(this.frameItems.buttons[1], 380/2, 90  + buttonSpace + buttonHeight +  buttonHeight/2);

      //draw button 3
      fill(this.frameItems.colors[2].color);
      rect(10, 90 + buttonSpace*2 + buttonHeight*2, 380, buttonHeight);
      fill(255);
      text(this.frameItems.buttons[2], 380/2, 90 + + buttonSpace*2 + buttonHeight*2 + buttonHeight/2);

      //draw score
      fill(0);
      textAlign(LEFT);
      textSize(16);
      text('Score: ' + this.score, 10, 410);

      //compute progressbar time left
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.timeLeft = this.totalTime;
        this._generateInstruction();
        this.frameItems = this._getFrameItems()
        if (this.score > 0 ) this.score--;
      }
    }
  }

  reset() {
    this.score = 0;
    this.totalTime = this.timeBarInSeconds * this.fps;
    this.timeLeft = this.totalTime;
    this.gameOver = false;
    this._generateInstruction();
    this.frameItems = this._getFrameItems()
  }

  click(button_number) {
    if (this._checkCondition(button_number)) {
      this.score++;
      this.frameItems = this._getFrameItems();
      this._generateInstruction();
      this.timeLeft = this.totalTime;
    } else {
      this.gameOver = true;  
    }
  }

  _getFrameItems() {
    return {
      buttons: shuffle(this.items.buttons),
      colors: shuffle(this.items.colors)
    };
  }

  _checkCondition(itm_number) {
    let win = this.instr_text ?
      this.items.buttons[this.instr_itm] === this.frameItems.buttons[itm_number] :
      this.items.colors[this.instr_itm].name === this.frameItems.colors[itm_number].name;
    return (this.instr_press === win)
  }

  _generateInstruction() {
    this.instr_press = random() > 0.5;
    this.instr_text = random() > 0.5;
    this.instr_itm = Math.floor(random(3));

    this.instruction = this.instr_press ? "Appuie" : "N'appuie pas";
    this.instruction += " sur le bouton ";
    this.instruction += this.instr_text ? this.items.buttons[this.instr_itm] : this.items.colors[this.instr_itm].name;
  }
}

function shuffle(array) {
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
