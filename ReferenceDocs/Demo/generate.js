// var input = "F7 Bb7 F7 F7 Bb7 Bdim7 F7 D7 Gmin7 C7 F7 C7";
// var input = "F7 E7 D7 G7 A7 Ab7 Dmin7 Bb7";
var input = "Amaj7 Dm7 G7 Cm7b5 Fdim7 Bmaj7 Em7 A7 Dm7b5 Gdim7 Cmaj7 Fm7 B7 Em7b5 Adim7 Dmaj7 Gm7 C7 Fm7b5 Bdim7 Emaj7 Am7 D7 Gm7b5 Cdim7 Fmaj7 Bm7 E7 Am7b5 Ddim7 Gmaj7 Cm7 F7 Bm7b5 Edim7 Abmaj7 Dbm7 Gb7 Cbm7b5 Fbdim7 Bbmaj7 Ebm7 Ab7 Dbm7b5 Gbdim7 Cbmaj7 Fbm7 Bb7 Ebm7b5 Abdim7 Dbmaj7 Gbm7 Cb7 Fbm7b5 Bbdim7 Ebmaj7 Abm7 Db7 Gbm7b5 Cbdim7 Fbmaj7 Bbm7 Eb7 Abm7b5 Dbdim7 Gbmaj7 Cbm7 Fb7 Bbm7b5 Ebdim7 A#maj7 D#m7 G#7 C#m7b5 F#dim7 B#maj7 E#m7 A#7 D#m7b5 G#dim7 C#maj7 F#m7 B#7 E#m7b5 A#dim7 D#maj7 G#m7 C#7 F#m7b5 B#dim7 E#maj7 A#m7 D#7 G#m7b5 C#dim7 F#maj7 B#m7 E#7 A#m7b5 D#dim7 G#maj7 C#m7 F#7 B#m7b5 E#dim7";

var chords = input.split(" ").map(chord => 
    Tonal.Chord.getChord(Tonal.Chord.get(chord).aliases[0], Tonal.Chord.get(chord).tonic + "4"));

notes = 
`X: 1
T: Demo
K: none
L: 1/8
M: C
Q: 120
%%score
|`;

let exerciseType="Scale";
let barOverflow = 0;
// let fixKey = true;

if (exerciseType == "Chord") notes += " [L:1/4] ";

for (const chord of chords) {
    notes += `"${chord.symbol}"`;
    if (exerciseType=="Chord") for (const note of chord.notes) 
        notes += Tonal.AbcNotation.scientificToAbcNotation(note);
    else if (exerciseType=="Scale") {
        let scaleChoice;
        switch(chord.aliases[0]) {
            case 'maj7':
                scaleChoice = "major";
                break;
            case 'm7':
                scaleChoice = "dorian";
                break;
            case '7':
                scaleChoice = "mixolydian";
                break;
            case 'm7b5':
                scaleChoice = "locrian";
                break;
            case 'dim7':
                scaleChoice = "diminished";
                break;
        }
        let beamBreak = 0;
        for (const note of Tonal.Scale.get(chord.tonic + " " + scaleChoice).notes) {
            notes += Tonal.AbcNotation.scientificToAbcNotation(note);
            beamBreak++;
            if (beamBreak == 4) notes += " "; //Proper beaming, will make automatic outside of demo
        }
        if (scaleChoice != "diminished") notes += "2"; // Making the last note twice as long so the scale fits the length of the measure
        // Note that the dim scale is an 8 note scale, so NA
    }

    notes += "|";
    barOverflow++;
    if (barOverflow%4==0) {
        barOverflow = 0;
        // if (fixKey) {
        //     fixKey = false;
        //     notes +="\nK:none"
        // }
        notes += "\n"
    }
}

// console.log(chords);
// for (let i of notes.split("\n")) console.log(i);

function load() {
    ABCJS.renderAbc("paper", notes, {jazzchords: true, initialClef: true, initialKey: true, add_classes:true, hideKeySignature: true});
}