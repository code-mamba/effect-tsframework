import { readFile } from "node:fs/promises";
import { Context, Effect as E, Layer } from "effect";

export class FileReadError {
  readonly _tag = "FileReadError";
}

export const readFileE = (filePath: string) =>
  E.tryPromise({
    try: () => {
      return readFile(filePath, { encoding: "utf-8" });
    },
    catch: (error) => {
      return new FileReadError();
    },
  });

const gImpl = {
  readFileE: readFileE,
} as const;

export const Imp = E.succeed(gImpl);

export class FileService extends Context.Tag("File")<
  File,
  E.Effect.Success<typeof Imp>
>() {
  static Live: Layer.Layer<File, never, never> = Layer.effect(FileService, Imp);
}
