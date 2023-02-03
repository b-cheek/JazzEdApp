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
