import { Effect } from "effect"

class FooErr {
    readonly _tag = "FooErr"
}

class BarErr {
    readonly _tag = "BarErr"
}

const conditions = [false, false, false] as [boolean, boolean, boolean]

const errors = Effect.gen(function*(_){
    if(conditions[0]){
        yield* _(Effect.fail(new FooErr()))
    }
    else if(conditions[1]){
        yield*_(Effect.fail(new BarErr()))
    }
    else if (conditions[2]){
        yield* _(Effect.die("Boom"))
    }
    return "Success"
})
const result = Effect.runSync(errors)
console.log(result)