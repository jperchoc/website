class Guitar {
  constructor(tuning) {
    this.setTuning(tuning);
    this.root = "A";
    this.mode = MusicToolsConstants.MODES.Major;
  }

  setTuning(tuning) {
    this.tuning = [];
    let spl = tuning.split("");
    for (let i = 0; i < spl.length; i++) {
      let note = spl[i];
      if (i !== spl.length-1 && spl[i+1]==='#') {
        note+="#";
        i++
      } 
      this.tuning.push(note);
    }
  }

  draw(nFrets, x, y, r, xSpace, ySpace) {
    //Draw Strings
    for (let i = 0; i < this.tuning.length; i++) {
      let note = this.tuning[this.tuning.length - 1 - i];
      this.drawLineNotes(note, nFrets, x, y + i * (r + ySpace), xSpace, r);
    }
    //Draw frets number
    for (let i = 0; i <= nFrets; i++) {
      fill(200);
      let ty = 15 + y + this.tuning.length * (r + ySpace);
      let tx = x + r * (i + 1) + i * xSpace;
      text(i, tx, ty);
    }
  }

  setRoot(root) {
    this.root = root;
  }

  setMode(mode) {
    this.mode = mode;
  }

  setChord(root, mode) {
    this.setRoot(root);
    this.setMode(mode);
  }

  getChordNotes() {
    return this.root !== null && this.mode !== null
      ? MusicTools.getChord(this.root, this.mode)
      : [];
  }

  drawLineNotes(firstNote, nNotes, startx, starty, marginXNotes, r) {
    let startIdx = MusicToolsConstants.NOTES.indexOf(firstNote);
    let chordNotes = this.getChordNotes();
    for (let i = 0; i <= nNotes; i++) {
      let note =
        MusicToolsConstants.NOTES[
          (startIdx + i) % MusicToolsConstants.NOTES.length
        ];
      let idx = chordNotes.indexOf(note);
      if (idx !== -1) fill(MusicToolsConstants.NOTES_COLORS[idx]);
      else fill(255);
      let x = startx + r * (i + 1) + i * marginXNotes;
      let y = r + starty;
      ellipse(x, y, r);
      fill(0);
      text(note, x, y);
    }
  }
}
