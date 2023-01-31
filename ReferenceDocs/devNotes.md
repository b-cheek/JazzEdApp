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
