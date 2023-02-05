var abc =
`X: 1
T: Demo
K: F
L: 1/8
M: C
Q: 120
%%score
[|"F7"z8|"Bb7"z8|"F7"z8|"F7"z8|
|"Bb7"z8|"Bdim7"z8|"F7"z8|"D7"z8|
|"G-7"z8|"C7"z8|"F7"z8|"C7"z8|]`;


var chords = 
[
    Tonal.Chord.getChord(Tonal.Chord.get("F7").aliases[0], Tonal.Chord.get("F7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("Bb7").aliases[0], Tonal.Chord.get("Bb7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("F7").aliases[0], Tonal.Chord.get("F7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("F7").aliases[0], Tonal.Chord.get("F7").tonic + "4"),

    Tonal.Chord.getChord(Tonal.Chord.get("Bb7").aliases[0], Tonal.Chord.get("Bb7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("Bdim7").aliases[0], Tonal.Chord.get("Bdim7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("F7").aliases[0], Tonal.Chord.get("F7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("D7").aliases[0], Tonal.Chord.get("D7").tonic + "4"),

    Tonal.Chord.getChord(Tonal.Chord.get("Gmin7").aliases[0], Tonal.Chord.get("Gmin7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("C7").aliases[0], Tonal.Chord.get("C7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("F7").aliases[0], Tonal.Chord.get("F7").tonic + "4"),
    Tonal.Chord.getChord(Tonal.Chord.get("C7").aliases[0], Tonal.Chord.get("C7").tonic + "4"),
];

notes = 
`X: 1
T: Demo
K: F
L: 1/8
M: C
Q: 120
%%score
L:1/4
|`;

let barOverflow = 0;
let fixKey = true;

for (const chord of chords) {
    notes += `"${chord.symbol}"`;
    for (const note of chord.notes) {
        notes += Tonal.AbcNotation.scientificToAbcNotation(note) + " ";
    }
    notes += "|";
    barOverflow++;
    if (barOverflow%4==0) {
        barOverflow = 0;
        if (fixKey) {
            fixKey = false;
            notes +="\nK:none"
        }
        notes += "\n"
    }
}

console.log(chords);
for (let i of notes.split("\n")) console.log(i);

function load() {
    ABCJS.renderAbc("paper", notes, {jazzchords: true, initialClef: true, initialKey: true, add_classes:true, hideKeySignature: true});
}