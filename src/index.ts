import { Effect } from "effect";

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("unable to divide by zero"))
    : Effect.succeed(a / b);

// Effect generator
const firstgen = Effect.gen(function* (_) {
  const x = yield* _(Effect.sync(() => Date.now()));
  const y = x * 2;
  const z = yield* _(divide(y, 3))
  return z
});

const result = Effect.runSync(firstgen)
console.log(result)
