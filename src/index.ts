import { Effect, pipe } from "effect";
import { FileService } from "./service";


const program = pipe(
    Effect.Do,
    Effect.bind('file', ()=> FileService),
    Effect.bind('Filecontent',({file})=>{
        return file.readFileE("src/files/file1.txt")
    })
)
const runnable = Effect.provide(program, FileService.Live)

Effect.runPromise(runnable).then(console.log)



