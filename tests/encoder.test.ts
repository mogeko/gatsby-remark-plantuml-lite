import { encode, encodeSync } from "@/encoder";
import { expect, it } from "vitest";

it("encoder", async () => {
  expect(await encode(`@startuml\nA -> B: Hello / 你好'\n@enduml`)).toMatch(
    /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDI/,
  );
});

it("encoderSync", () => {
  expect(encodeSync(`@startuml\nA -> B: Hello / 你好'\n@enduml`)).toMatch(
    /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDI/,
  );
});
