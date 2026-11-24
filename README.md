# Human Train — Everyday Things, Two Lines

[![make.fun · u-suga-everyday-things-two-lines-longer-run-f8734479](https://make.fun/badge/u-suga-everyday-things-two-lines-longer-run-f8734479.svg)](https://make.fun/bounty/u-suga-everyday-things-two-lines-longer-run-f8734479?utm_source=github&utm_medium=readme&utm_campaign=u-suga-everyday-things-two-lines-longer-run-f8734479)
[![make.fun rank](https://make.fun/badge/u-suga-everyday-things-two-lines-longer-run-f8734479/Sidik9991/makefun-everyday-lines/rank.svg)](https://make.fun/bounty/u-suga-everyday-things-two-lines-longer-run-f8734479?utm_source=github&utm_medium=readme&utm_campaign=u-suga-everyday-things-two-lines-longer-run-f8734479)
[![make.fun reward](https://make.fun/badge/u-suga-everyday-things-two-lines-longer-run-f8734479/Sidik9991/makefun-everyday-lines/reward.svg)](https://make.fun/bounty/u-suga-everyday-things-two-lines-longer-run-f8734479?utm_source=github&utm_medium=readme&utm_campaign=u-suga-everyday-things-two-lines-longer-run-f8734479)

Two lines for make.fun's "Everyday Things, Two Lines, Longer Run" bounty.
Line 1 explains a queue to a 10-year-old in a single vivid sentence: a queue
is a human train, everyone standing on the same invisible track, one carriage
behind the next, moving only when the front carriage does. Line 2 says in one
sentence why that analogy works — it maps the order, nobody overtaking,
everyone moving together — and what it leaves out: a real train never lets a
carriage wander off to buy a snack and come back.

`main.ts` (Node, no dependencies) holds ten candidate two-line entries, scores
each 0–2 on the judge brief's five criteria in the brief's own order —
explains one everyday thing to a 10-year-old, concrete and surprising analogy,
one vivid sentence, honest and specific limits, the two lines working as a
pair — weights them 5/4/3/2/1, picks the highest scorer, writes it to
`/output/entry.txt`, then re-reads it and validates the gate (1–400
characters, exactly two lines, one sentence each).

## Run it

```sh
node main.ts
cat /output/entry.txt
```

## License

MIT — see `LICENSE`.
