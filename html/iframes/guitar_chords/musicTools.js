const MusicToolsConstants = {
  NOTES: ['A','A#','B','C','C#','D','D#','E','F','F#','G','G#'],
  WHITE_NOTES: ['A','B','C','D','E','F','G'],
  BLACK_NOTES: ['A#','C#','D#','F#','G#'],
  NOTES_COLORS: ['#c83232', '#32c832', '#6868d9', '#c832c8', '#c8c832', '#b464c8', '#c8b464'],
  MODES: {
    Major:           0,
    Minor:           1,
    Diminished:      2,
    MajorSeventh:    3,
    MinorSeventh:    4,
    DominantSeventh: 5,
    Suspended2:      6,
    Suspended4:      7,
    Augmented:       8,
    DominantNinth:   9,
    MajorEleventh:   10
  }
};
class MusicTools {
  static getChord(root, mode) {
    let idxRoot = MusicToolsConstants.NOTES.indexOf(root);
    let chordNotes = [root];
    switch(mode) {
      case MusicToolsConstants.MODES.Major:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 4) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 7) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.Minor:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 3) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 7) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.Diminished:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 3) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 6) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.MajorSeventh:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 4) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 5) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 11) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.MinorSeventh:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 3) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 7) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 10) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.DominantSeventh:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 4) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 7) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 10) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.Suspended2:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 2) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 7) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.Suspended4:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 5) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 7) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.Augmented:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 4) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 8) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.DominantNinth:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 4) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 7) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 10) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 14) % MusicToolsConstants.NOTES.length]);
        break;
      case MusicToolsConstants.MODES.MajorEleventh:
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 4) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 7) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 11) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 14) % MusicToolsConstants.NOTES.length]);
        chordNotes.push(MusicToolsConstants.NOTES[(idxRoot + 17) % MusicToolsConstants.NOTES.length]);
        break;
    }
    return chordNotes;
  }
}
