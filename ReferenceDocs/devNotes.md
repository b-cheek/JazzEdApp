# Notes

## 1/27/2023 13:37

Learned abc basics, researched later problems:

### Chords and Playback

abcjs does not have a complete harmonic vocabulary, so I will have to implement the system for reading and understanding chords mostly on my own.

I think the best idea is to have an optional background of just basic piano voicings eventually, which will be achieved by having two `visualObj` objects:

|Visible|Hidden|
|----|----|
|uses voice overlay `&` to represent the improvised melody and chord symbols attached to hidden notes using `y`| Uses voice overlay to represent the improvised melody and piano comping that is generated based on the changes|
|displayed for the user|passed to the synth|

See [an example](https://paulrosen.github.io/abcjs/examples/basic-synth.html)

### Miscellaneous

* Note the `jazzchords` option for the `renderabc()` function
* Note [this demo](https://paulrosen.github.io/abcjs/examples/modify-synth-input.html) that shows how to implement swing
* You can just stack `'` and `,` to modify octaves without dealing with capitalization

## 1/31/2021 0:54

I've been looking into how I want to design this app. Here's what I'm thinking:

* Progressive Web App
* Vue
* Nuxt?
* TypeScript?
* BootstrapVue
* Firebase

[Examples](https://hnpwa.com/) (HackerNews Clones)

[Tutorial](https://blog.logrocket.com/building-pwa-vue/)

I'm still thinking about using [PWABuilder](https://www.pwabuilder.com/), so I think I'll sleep on it (2:37)

## 1/31/2023 10:24

I've slept on it, and I should really just start working so I'm just going to get going on a demo using typescript

### 11:12

ok I thought a little longer and I was thinking about the backend and how I should consider a relational database for the experience.

I've decided that using a document oriented database (Firebase Firestore) is gonna be the best move. I think I'm still gonna look into PWABuilder a little, but hoping to move on with writing a demo by tomorrow.

## 2/1/2023 19:23

OK I don't think I'm gonna use PWABuilder, but I'll probably revisit the question when I get around to that step.

Thinking more about coding functionality, I want to start documenting ideas for generating music and other aspects of the app itself.

As for how I'm going to code this, I think javascript/typescript will work with the research I've done on the stack to use, as long as there are no major alterations to backend or API which should be covered by firebase.

I think using the [Tonal.js](https://github.com/tonaljs/tonal) library with typescript will be the most effective solution that allows for simplicity and extensibility.

For actual generation itself, I may also make a separate document to put ideas in, but for now I'll put it in these notes.

Here is a sort of outline for ideas for generation:

- [ ] Exercises to play over chord changes
  * Scales
  * Arpeggios
- [ ] Strict scalar eighth note lines
  * Simple up and down
  * [Barry Harris concepts](https://www.youtube.com/watch?v=R-d4PmAXsms&list=PLZ12xkgS35S8ziqiOaN_5U3DLoZm_S0du&index=2) for bebop lines
- [ ] Add other  bebop embellishments
  * Arpeggios
  * Enclosures
  * Approach tones
  * Chromatics

These are my current goals, but I'm going to put down some future ideas for more complex generation:

### Melody Construction (Carlos)

Z is a convenient placeholder name

Z could decide on an amount of notes for motif using weights

Weights may depend on other factors if those are decided first in algorithm- maybe algorithm can change the order of operations for a starting theme but it would probably be simpler to start with one thing.. at a glance, maybe the length of the first note or the amount of notes should determine other factors

Once the algorithm decides on the amount of notes for a motive, maybe it can decide on a rhythm based on weights as well. It can also decide to add predetermined embellishments in certain spots- for example:

If a motive ends up having an even number of repeating notes at the beginning, it can have a probability of adding a pickup note before it, (maybe the pitch of the note being decided by the function of the note after it)

Whatever is most practical, pitches before rhythm or rhythm before pitches, Z's decisions about the other would be informed by the first.

Motives should probably have at least 2 notes and have a max amount of notes (that arent embellishments) .. maybe 8?

Pitches need to be organized in a way so that Z knows which are going to be contextually tense or consonant.. like over a chord x in key y, Z would know how pitches need to be treated based on the offensiveness of the note if it's sustained (maybe?)

We should consider having a database of motives it pulls from every now and then too- comprised of licks, existing popular melodies, quotes, and the likes

## 2/3/2023 18:01

I am starting to work on the actual functionality of the demo; I created a dedicated js file for the generation instead of a script tag. I used jsdelivr to get Tonaljs, but I'll probably install modules individually for the final project.

All I did today was write up an F blues in the abc string, and create the Tonal chord objects that will be used as reference to generate the melody. The only problem I need to figure out with that is **how I want to indicate the duration of each chord symbol**. For now that's not a problem kind of because each chord lasts one measure in my chord array, but this is something that should be resolved in the demo.

## 2/4/2023 21:50

I'm thinking that the solution to my problem before is to create a class that can store a duration along with either a Tonal chord/note. For now I will generate notes for each chord, but for more complex generation I should probably analyze chords first to consider the future while generating.

### 23:27

So I finished writing code to generate a basic arpeggio for any chord. There are a lot of things that will only work for the demo; here is a list of things that would cause this code to break (for future reference):

* There is more than one chord in a measure
* A chord has more than 4 notes
* Hardcoded features:
  * 12 bars
  * line breaks every 4 bars
  * Hack to hide key signature after first line
  * Different meters

This is alright though because I will have to write more complex code that takes care of these problems automatically for many cases (e.g. line wrapping).

#### Line break formatting issue

I spent much of my time trying to figure out how I could format line breaks like most jazz music, where new lines start with just a bar, and no clef or key signature. It seems that most music written in abc will have the clef and key on every line. I don't like how this looks, so I opted for the best current workaround where I remove the key after the first line and have no bar at the beginning of each new line (if I put a bar then the lines of the staff extend slightly to its left, which looks worse in my opinion).

Worst case scenario I contribute to the source code to make this possible, but I think I may be able to do an easier workaround where I move each of those new barlines slightly to the left. Best case scenario, Carlos would prefer a layout that is possible within abcjs, and I can change it;

Things I think I should ask Carlos:

* Preferred chord symbols or no? If so which are preferred?
* How should new lines look?
  * Clef?
  * Key?
* If chords are entered manually, what would be best?
* Any specific exercises I should add other than arpeggios and scales?

I'm calling it for the night, over the next few days I would like to add:

* Scale exercises
* A button to "generate" exercises
* Maybe a button/dropdown that allows you to choose between scales and arpeggios

## 2/5/2023 21:24

I made it so the `chords` object is generated by a text input of chord symbols separated by spaces like so:

`var input = "F7 Bb7 F7 F7 Bb7 Bdim7 F7 D7 Gmin7 C7 F7 C7";`

This allows me to easily change the displayed chords for demonstration purposes.

I originally wanted to have the text input be on the actual page, but I deemed that to be difficult and unnecessary at this stage.

The only problem I currently need to fix is that accidentals are always written, even when within the key. I assume there is an easy solution for this, but I'm done for the night, so I won't create a GitHub issue.

## 2/6/2023 14:48

After sleeping on it, I determined that it is best to default to the key of C and write out all accidentals for the demo.

I think this is a fair choice because the purpose of the demo is to output the exercises for each of the chords, which should be independent of any form of harmonic analysis and thus key.

I commmented out the hack to remove the key signature because it is no longer necessary, but I want to remember how I addressed it for future reference.

### 16:09

I added functionality for the scales exercise, and hardcoded the scale vs chord option.

I also hardcoded an input containing the 5 basic 7 chords (maj7 -7, 7, -7b5, and dim7) for 21 note names (A-G, with sharp and flat versions). Note that doing this showed that **triple flat notes (and presumably triple sharp) are not displayed correctly**

I will leave this for now, because it only applies to Cbdim7 and Fbdim7, I would rather do an error message telling them to put B or E. I'll have to look into whether these chords should genuinely appear. The only other thing I'd like to complete before showing the demo is **browser buttons to generate each option**

#### Tonal problems

I'm starting to dislike the way Tonal js does things; I wish the modules interacted with eachother more effectively. For example, it would be nice if `chord.notes` was an array of `Note` objects, instead of strings.

I think the scale of this may actually be small enough to write a basic library myself. I am going to put some thought into figuring that out after I show Carlos the demo.

## 2/8/2023

### Generation ideas

Thought of another generation concept:

* Randomly generate a melodic contour
  * A melodic contour is a graph of maybe three to four points representing pitch with relation to time
* Assign these points to strong notes:
  * Guide tones
  * Chord tones
  * Color tones?
* Connect these notes in a logical way depending on the time between them, aided using:
  * Chromatics
  * Embellishments

I think this should be one of many ways to generate a line, others being through repetition or leaning on a specific idea/gimmick. For example:

* Repetition of a pattern over a
  * Scale
  * Chord
  * conflicting time (for example repeating a figure that lasts 5 eighth notes in a 4/4 meter)
  * Note the idea of leaving the pitches of the repeated idea the same so the function changes with a new chord
* Specific idea like
  * Long high note
  * Recognizable lick
  
I think these ideas could pair well with motivic development that may be harder to implement. A final closing idea is that the idea of a contour could be used in the context of an entire solo.

### 2:38

I added the buttons to control generation, and I generate rests by default. Note, **Having DE at the beginning with *tr* above means that an invisible character (usually tab) is being read as abc**.

Tomorrow I want to do some styling and then make this demo officially complete, I'll try and make it a release on github. Will go into more detail then.

Also so I don't forget, some other questions I want to ask Carlos:

* Does the user input key signature?
* Repeats allowed?
  * Would generation be without a repeat presumably?
* Cap on number of measures?
* Best way for user to manually input chord symbols?

## 2/12/2023 2:39

Just had a pretty random thought that I wanted to write down in here.

For a hypothetical tonaljs replacement that I might write, a good thought would be to have some sort of structure linking chords and scales in an exact way.

For example, the V chord in major is dominant, and the V scale (mixolydian) is the matching scale. I haven't thought too deep into this, like how dorian and aeolian are both linked to minor 7th chords, but I think it would be a good idea. 

I decided to write this down when I thought about how I could do this for the four 7 note (non-symmetrical) scales: major, harmonic major, harmonic minor, and (ascending) melodic minor (AKA minor major).

I will have to look into some of those chord scale relationships, but this could be a useful idea for very simple generation. The only flaw/simplification is that a ii and V chord both are just modes of the same I major scale. Will put more thought into this later.

## 4/12/2023 4:48

Been a while, just got the create Vue app PWA up, will start learning a bit more about the development process, generally following [this tutorial](https://blog.logrocket.com/building-pwa-vue/)

Note that there seems to be some strange stuff with the version control, a lot of files are displayed as deleted.

Note that the full command to build and serve is

```CLI
npm run build ; npx http-server dist
```

## 4/17/2023 13:45

Just looked over the 1.0 goals and went through a vue tutorial, thinking about some of the implementation.

Carlos said that the choosing to eliminate certain notes isn't super important so that's good.

Only thing now is that I'm just not so sure of exactly what he wants aside from exercises.

## 6/3/2023 23:02

Need to start working on this. Here are some notes from a meeting:

* no repeats
* arpeggiate up and down, lead to nearest note in other arpeggio
* stepwise, chord scale
