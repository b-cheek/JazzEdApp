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
    Tonal.Chord.get("F7"),
    Tonal.Chord.get("Bb7"),
    Tonal.Chord.get("F7"),
    Tonal.Chord.get("F7"),
    Tonal.Chord.get("Bb7"),
    Tonal.Chord.get("Bdim7"),
    Tonal.Chord.get("F7"),
    Tonal.Chord.get("D7"),
    Tonal.Chord.get("Gmin7"),
    Tonal.Chord.get("C7"),
    Tonal.Chord.get("F7"),
    Tonal.Chord.get("C7"),
];

console.log(chords);

function load() {
    ABCJS.renderAbc("paper", abc, {jazzchords: true});
}
