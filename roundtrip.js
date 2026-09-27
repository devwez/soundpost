// pulls the pure audio fns out of index.html and checks encode->decode roundtrips
const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const m = html.match(/<script>([\s\S]*?)<\/script>/);
let src = m[1].split("// ---------- browser bits ----------")[0];

let mod = {};
new Function("grab", src + "\ngrab({TONES, ORDER, checksumChar, encode, decode});")((o) => Object.assign(mod, o));
const { encode, decode } = mod;

let fails = 0;
const msgs = ["hello", "well", "aa", "llama", "mississippi", "bee", "hi#!", "a@b.c", "wow?", "end-", "soundpost v2"];
for (const msg of msgs) {
  const enc = encode(msg, 48000);
  const r = decode(enc.samples, enc.sr);
  const ok = r.ok && r.body === msg;
  if (!ok) fails++;
  console.log(JSON.stringify(msg), "->", JSON.stringify(r.body), ok ? "OK" : "FAIL " + r.reason);
}
// garbled input should fail checksum, not return garbage as good
const enc = encode("test", 48000);
for (let i = 1000; i < 5000; i++) enc.samples[i] = (Math.random() - 0.5) * 0.9;
const bad = decode(enc.samples, enc.sr);
console.log("garbled:", bad.ok ? "FAIL (accepted)" : "OK (rejected: " + bad.reason + ")");
if (bad.ok) fails++;
console.log(fails ? fails + " FAILURES" : "all roundtrips ok");
process.exit(fails ? 1 : 0);
