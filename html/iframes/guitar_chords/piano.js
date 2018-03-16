class Piano {
  constructor() {
    this.root = "A";
    this.mode = MusicToolsConstants.MODES.Major;
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

  draw(x, y) {
    let chordNotes = this.getChordNotes();
    let wW = 30;
    let wH = 100;
    let bW = 20;
    let bH = 80;
    for (let k = 0; k < 3; k++) {
      let offset = k * (7*wW);
      for (let i = 0; i < 7; i++) {
        let note = MusicToolsConstants.WHITE_NOTES[i];
        let idx = chordNotes.indexOf(note);
        if (idx !== -1) fill(MusicToolsConstants.NOTES_COLORS[idx]);
        else fill(255);
        rect(offset + x + i * wW, y, wW, wH);
        fill(0);
        text(note, offset + x + i * wW + wW/2, y + wH - 10);
      }
      
      for (let i = 0; i < 6; i++) {
        if (i !== 2) {
          let note = MusicToolsConstants.BLACK_NOTES[i > 2 ? i-1:i];
          let idx = chordNotes.indexOf(note);
          if (idx !== -1) fill(MusicToolsConstants.NOTES_COLORS[idx]);
          else fill(50);
          rect(offset + x + (i + 1) * wW - bW / 2, y, bW, bH);
          fill(200);
          text(note, offset + x + (i + 1) * wW, y + bH - 10);
        }
      }
    }
  }
}
