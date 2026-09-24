# Soundpost

**SEND SIMPLE TEXT WITH SOUND** – no Wi‑Fi, no Bluetooth, no accounts.

The sender uses a cheap speaker, the receiver uses a microphone. Two short tones per character, 80 ms each, represent letters, digits and a few punctuation marks.

### Features
- *Send*: type text, hit **Play**, the browser plays the chirps.
- *Receive*: the receiver’s browser listens to your microphone and outputs text.
- *Double‑mode*: each character played twice for noisy rooms.
- *Export*: record a .wav file and play it back later.

### How it works
Each character is mapped to two frequencies. Three lead chirps start the message so we know where a new message begins. A checksum at the end confirms we didn’t miss any character.

### Usage
1. Clone the repo.
2. Open `index.html` in a browser.
3. Click *Play* to send, *Start listening* to receive.
4. You can also **Save WAV** then **Upload WAV** to decode a saved recording.

### Known issues
- Needs a quiet room; background noise can break decoding.
- Duple letters sometimes merge.
- Only a‑z, 0‑9, space, `.,?!-@#` are supported.

### License
MIT.
