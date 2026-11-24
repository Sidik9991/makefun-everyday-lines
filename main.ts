// Everyday Things, Two Lines — "Human Train"
// make.fun bounty: u-suga-everyday-things-two-lines-longer-run-f8734479
// Node, no dependencies. Picks the best of N two-line entries at runtime,
// writes it to /output/entry.txt, re-reads it and validates the gate.
//
// Judge brief (RULES.txt), most important first:
//   1. Explains ONE everyday thing to a 10-year-old in one vivid sentence,
//      with a second sentence on what the analogy maps and what it leaves out.
//   2. First line's analogy is concrete and surprising: things a 10-year-old
//      can see, hold or stand in, joined in a way never met before.
//   3. First line is ONE vivid sentence, the picture whole: no list of
//      comparisons, no second metaphor crowding it.
//   4. Second line is honest and specific: which parts the analogy covers
//      and which it leaves out, instead of praising the analogy.
//   5. The two lines work as a pair, the second explaining the first rather
//      than repeating it, in language a 10-year-old follows without being
//      talked down to.
// Gate: /output/entry.txt is UTF-8 text of 1 to 400 characters, not only
// whitespace. Each line is scored 0-2 per criterion, weights 5/4/3/2/1
// in the judge's order (max 30). Highest total wins; ties go to the
// earliest candidate.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WEIGHTS = [5, 4, 3, 2, 1];
const OUT = "/output/entry.txt";

type Candidate = {
  id: string;
  topic: string;
  line1: string;
  line2: string;
  // scores[0..4] = criteria 1..5, each 0-2.
  scores: [number, number, number, number, number];
  why: string;
};

const CANDIDATES: Candidate[] = [
  {
    id: "toaster-sunbed",
    topic: "toaster",
    line1:
      "A toaster is a little sunbed where your bread lies between two glowing orange bars until its cheeks turn golden and it pops up, done with its tan.",
    line2:
      "The sunbed part fits — bread lies flat and browns on both sides — but a real sunbed never shoots you into the air or sets a timer for your tan.",
    scores: [2, 2, 2, 2, 1],
    why: "Strong single metaphor and honest limits; line 2 leans on the word 'sunbed' once too often, so pair-work is a notch below perfect.",
  },
  {
    id: "traffic-river",
    topic: "traffic jam",
    line1:
      "A traffic jam is a river that forgot how to flow, full of metal fish swimming nose-to-tail down the same narrow stream, waiting for the water to remember.",
    line2:
      "It fits because the cars really do crawl along in one slow stream, but rivers never honk, and no fish ever chose to sit behind a truck.",
    scores: [2, 2, 1, 2, 2],
    why: "Concrete and surprising, but the metal fish are a second image crowding the river — criterion 3 docks it.",
  },
  {
    id: "rain-watering-can",
    topic: "rain",
    line1:
      "Rain is the sky tipping over a giant watering can, drop by drop, so every roof and leaf gets a drink it never asked for.",
    line2:
      "The watering-can part works — water really does fall from above in drops — but nobody holds the handle, and the sky never checks if the plants are thirsty.",
    scores: [2, 1, 2, 2, 2],
    why: "Clean pair and honest limits, but a watering can is the first comparison every child meets — not surprising enough for criterion 2.",
  },
  {
    id: "queue-human-train",
    topic: "queue",
    line1:
      "A queue is a human train: everyone stands on the same invisible track, one carriage behind the next, and the whole train only moves when the front carriage does.",
    line2:
      "It maps the order — nobody overtakes and everyone moves together — but a real train never lets a carriage wander off to buy a snack and come back.",
    scores: [2, 2, 2, 2, 2],
    why: "WINNER. One everyday thing, one sentence, one surprising metaphor a child can stand inside (the track, the carriages); line 2 names exactly what maps (order, moving together) and what breaks (a carriage wandering off) without praising the analogy.",
  },
  {
    id: "elevator-climbing-room",
    topic: "elevator",
    line1:
      "An elevator is a small room that learned to climb stairs, carrying you up in its belly while the floors slide past outside its doors.",
    line2:
      "The climbing-room part fits — you stand still while the room does the moving — but real rooms never move at all, and stairs never carry you while you stand still.",
    scores: [2, 2, 2, 1, 2],
    why: "Good picture, but line 2 states the gap as a flat negation ('rooms never move') instead of naming precisely what the analogy leaves out.",
  },
  {
    id: "washer-bathtub",
    topic: "washing machine",
    line1:
      "A washing machine is a bathtub for your clothes that spins them round and round until the dirt gives up and rinses away.",
    line2:
      "The bathtub part fits — clothes really do soak and spin in soapy water — but your bath never spins, and no jumper ever shrank in a real tub.",
    scores: [2, 1, 2, 2, 2],
    why: "Honest and tidy, but a bathtub is a familiar comparison — criterion 2 wants a join the reader has not met before.",
  },
  {
    id: "microwave-lightning",
    topic: "microwave",
    line1:
      "A microwave is a tiny lightning storm in a box that shakes the water inside your food until the food heats itself from the inside out.",
    line2:
      "The storm part fits — invisible energy really does shake water — but there is no thunder, and it cannot brown bread the way a hot oven can.",
    scores: [2, 2, 2, 2, 1],
    why: "Surprising and specific, but 'heats itself from the inside out' is a touch abstract for a 10-year-old, so the pair lands a notch below perfect.",
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

function sentences(line: string): number {
  // Count sentence-ending periods (a line must be exactly one sentence).
  return (line.match(/\./g) || []).length;
}

function main(): void {
  console.log("criteria weights (judge order): " + WEIGHTS.join("/"));
  let best: Candidate | null = null;
  let bestScore = -1;
  for (const c of CANDIDATES) {
    const t = total(c);
    console.log(
      `${c.id.padEnd(24)} topic=${c.topic.padEnd(15)} scores=[${c.scores.join(",")}] total=${t}/30`,
    );
    if (t > bestScore) {
      bestScore = t;
      best = c;
    }
  }
  if (!best) throw new Error("no candidates");
  console.log(`winner: ${best.id} (${bestScore}/30) — ${best.why}`);

  const text = `${best.line1}\n${best.line2}\n`;
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT, text, "utf8");

  // Re-read and validate the gate, loudly.
  const back = readFileSync(OUT, "utf8");
  if (back !== text) throw new Error("re-read mismatch: /output/entry.txt differs from chosen entry");
  const chars = [...back].length;
  if (chars < 1 || chars > 400) {
    throw new Error(`gate FAIL: entry is ${chars} characters, must be 1-400`);
  }
  if (back.trim().length === 0) throw new Error("gate FAIL: entry is only whitespace");
  const lines = back.replace(/\n$/, "").split("\n");
  if (lines.length !== 2) throw new Error(`gate FAIL: entry has ${lines.length} lines, must be exactly 2`);
  for (const [i, line] of lines.entries()) {
    if (!line.endsWith(".")) throw new Error(`gate FAIL: line ${i + 1} does not end with a period`);
    if (sentences(line) !== 1) {
      throw new Error(`gate FAIL: line ${i + 1} has ${sentences(line)} sentences, must be exactly 1`);
    }
  }
  console.log(`gate OK: ${chars} characters, 2 lines, 1 sentence each`);
  console.log("--- entry ---");
  console.log(back.trimEnd());
}

main();
