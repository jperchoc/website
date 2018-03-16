const marginX = 5;
const marginY = 30;
const marginXNotes = 10;
const marginYNotes = 5;
const notesR = 20;

let guitar = new Guitar("EADGBE");
let piano = new Piano();

let selectRoot;
let selectMode;
let selecTuning;

function setup() {
  createCanvas(
    2 * marginX + 25 * notesR + (25 + 2) * marginXNotes,
    2 * marginY + 6 * notesR + (6 + 2) * marginYNotes + 50 + 130
  );
  background(0);
  textAlign(CENTER, CENTER);
  /* Select Root Note */
  createSelectRoot();
  /* Select Chord Mode */
  createSelectMode();
  createSelectTuning();
}

function createSelectTuning() {
  selecTuning = createSelect();
  selecTuning.position(20, 15);
  selecTuning.option('EADGBE');
  selecTuning.option("DADGBE");
  selecTuning.option("DGDGBD");
  selecTuning.option("DADGAD");
  selecTuning.option("DADF#AD");
  selecTuning.option("CACGCE");
  selecTuning.option("CGCFCE");
  selecTuning.option("CGCGCE");
  selecTuning.changed(function() {
    guitar.setTuning(selecTuning.value());
  });
}

function createSelectMode() {
  selectMode = createSelect();
  selectMode.position(70, height - 20);
  for (let m in MusicToolsConstants.MODES) selectMode.option(m);
  selectMode.changed(function() {
    guitar.setMode(MusicToolsConstants.MODES[selectMode.value()]);
    piano.setMode(MusicToolsConstants.MODES[selectMode.value()]);
  });
}

function createSelectRoot() {
  selectRoot = createSelect();
  selectRoot.position(20, height - 20);
  for (let i = 0; i < MusicToolsConstants.NOTES.length; i++)
    selectRoot.option(MusicToolsConstants.NOTES[i]);
  selectRoot.changed(function() {
    guitar.setRoot(selectRoot.value());
    piano.setRoot(selectRoot.value());
  });
}

function draw() {
  background(0);
  textAlign(CENTER, CENTER);
  //Draw Guitar
  guitar.draw(24, marginX, marginY, notesR, marginXNotes, marginYNotes);
  piano.draw(60, 230);
  //Draw chord notes
  drawChordNotes();
}

function drawChordNotes() {
  let chordNotes = guitar.getChordNotes();
  let txtChordNotes = "";
  for (let i = 0; i < chordNotes.length; i++) {
    txtChordNotes += chordNotes[i];
    if (i !== chordNotes.length - 1) txtChordNotes += " - ";
  }
  fill(200);
  textAlign(LEFT, CENTER);
  text(txtChordNotes, 200, height - 20);
}