# soundpost

sends text through the air as sound. no internet, no bluetooth, no server — just a speaker and a mic.

built for hack club stardance. the whole thing is one html file, no frameworks, no dependencies.

## how it works

every character becomes one short chirp made of two tones playing at the same time. a-z, 0-9 and basic punctuation each get their own pair of frequencies. three leader chirps go first so the decoder knows where the message starts (five in 2x mode — the count is how the decoder knows), an end marker says when to stop, and one extra chirp at the end is a checksum so the decoder can tell you it misheard something instead of silently handing you garbage.

the decoder listens on the mic and matches what it hears against the tone table. no fft, just a goertzel per frequency i care about. good enough.

## what it does

- type a message, hit play, it chirps out the speaker
- any device running soundpost can decode it off the mic (or this one, speaker to its own mic)
- 2x mode sends every char twice for noisy rooms, decoder figures that out from the leader count
- save a message as a wav, load the wav back and decode it — good for testing without two devices
- live spectrogram so you can watch the chirps fly

## known issues

- needs a quiet room. the mic hears absolutely everything
- the checksum catches a bad chirp but can't fix it, it just tells you to send again
- repeated letters (ll, ss) sometimes merge into one. the gap between chars is long on purpose to make that less likely
- wav decoding only understands files the save wav button wrote. feed it music and you get garbage back

## running it

open index.html in a browser. that's it. allow mic access when you want to decode something.

## made by

bart / devwez — about 11 hours across a week, more coming

## ai note

used codebuff to help write and debug parts of the encoder/decoder. the idea, the tone table and the design calls are mine.
