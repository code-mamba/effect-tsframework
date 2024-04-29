import { Effect, pipe } from "effect";

const getDate = () => Effect.succeed(Date.now());
const double = (x: number) => x * 2;
const converToString = (x: number) => x.toString();
const convertToUpper = (x: string) => x.toUpperCase();

// const program = () => convertToUpper(converToString(double(getDate())))
// console.log(program())

// const program1 = pipe(getDate(), double, converToString, convertToUpper)
// console.log(program1)

// Effect.map

const doubleDate = pipe(
  getDate(),
  Effect.map((x) => double(x)),
  Effect.map((x) => converToString(x)),
  Effect.map((x) => convertToUpper(x))
);

const result = Effect.runSync(doubleDate);
console.log("1.", result);

// Effect.flatMap

const divide = (a: number, b: number): Effect.Effect<number, Error> =>
  b === 0
    ? Effect.fail(new Error("unable to divide by zero"))
    : Effect.succeed(a / b);

const program = pipe(
  Effect.succeed([5, 2] as const),
  Effect.flatMap(([a, b]) => divide(a, b))
);

const divideResult = Effect.runSync(program);
console.log("divideResult", divideResult);

const program2 = pipe(
  Effect.sync(() => Date.now()),
  Effect.tap((x) => console.log(x)),
  Effect.map((x) => x * 2),
  Effect.map((x) => x.toString()),
  Effect.map((x) => x.toUpperCase())
);

const result3 = Effect.runSync(program2);
console.log(result3);

// Effect.all -returns array of effects

const today = Effect.sync(()=>Date.now())
const yesterday = Effect.sync(()=>Date.now() - 24 * 60 * 60 * 1000)

const both = Effect.all([today, yesterday])

const program4 = pipe(
    Effect.all({a:today, b:yesterday}),
    Effect.map(({a,b})=>a+b)
)

const result4 = Effect.runSync(program4)
console.log("result4", result4)

const divideSample = (a:number, b:number):Effect.Effect<number, Error> => 
    b === 0 ?
    Effect.fail(new Error("unable to divide"))
    :Effect.succeed(a/b)

const program5 = pipe(
    Effect.sync(()=> Date.now()),
    Effect.flatMap((x)=> divideSample(x,2)),
    Effect.map((x)=>x.toString()),
    Effect.map((x)=>x.toUpperCase())
)

const result5 = Effect.runSync(program5)
console.log("result5",result5)