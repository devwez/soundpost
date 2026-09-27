# soundpost

air-gapped text transfer. chirps from speaker, mic picks it up, text rebuilds on the other side. no network, no bluetooth, no account.

i built this because i wanted to see if i could send data through air without any of the usual pipes. turns out two tones per character and a cheap microphone are enough for short messages if the room is quiet.

## how it works

each character = one chirp (two frequencies at once, 80ms). there's a 3-chirp leader at the start so the decoder knows where the message begins, and a checksum at the end so it can tell you something went wrong instead of handing you garbage.

the decode side uses Goertzel filters on the frequencies i care about — no FFT, no libraries, just math that's good enough for 26 letters and 10 digits.

the spectrogram at the bottom was a debug tool i left in because it looks cool when the chirps scroll past.

### Testing Notes
- Agent needs quiet room, no noise filtering, mic hears everything.
- Double letters (ll, ss) sometimes collapse.
- Tone table gap after 's' due to spacing change.
- Module exports read-only. No errors.

## what you can do

- send text from one device, receive it on another (or point your speaker at your own mic to test)
- 2x mode sends each char twice — this helps survive noise better
- save as wav, decode later — it's how I tested it out without needing two machines

## known issues

- it needs a quiet room; there's no noise filtering—the mic picks up everything.
- sometimes double letters (ll, ss) collapse into one.
- the tone table has a gap after 's' because I changed the spacing halfway through. fixing this would break the decode, so I left it alone.
- wav files can only be decoded if they were written by this app.

## run it

just open index.html. you'll need mic access to decode.

live: https://soundpost.vercel.app

---

built for Stardance. I spent most of the 16 hours coding the decoder part.
