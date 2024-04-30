import { Context, Effect } from "effect";

interface RandomImpl {
  readonly next: Effect.Effect<number>;
  readonly nextInBetween: (
    min: number,
    max: number
  ) => Effect.Effect<number, never, never>;
}

class Random extends Context.Tag("Random")<Random, RandomImpl>() {}

const RandomLive: RandomImpl = {
  next: Effect.sync(() => Math.random()),
  nextInBetween: (min, max) =>
    Effect.sync(() => Math.floor(Math.random() * (max - min + 1) + min)),
};

const program = Effect.gen(function* (_) {
  const random = yield* _(Random);
  const n = yield* _(random.nextInBetween(1, 2));
  if (n < 5) {
    return "Low";
  } else {
    return "High";
  }
});

const runnable = program.pipe(Effect.provideService(Random, RandomLive));

console.log(Effect.runSync(runnable));
