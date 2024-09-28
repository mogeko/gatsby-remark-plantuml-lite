import { Buffer } from "node:buffer";
import { deflate, encoder } from "@/encoder";
import { expect, it } from "vitest";

it("deflate", () => {
  expect(deflate("abc")).toStrictEqual(
    Buffer.from([75, 76, 74, 6, 0]).toString("binary"),
  );
});

it("encoder", () => {
  expect(encoder(`@startuml\nA -> B: Hello / 你好'\n@enduml`)).toMatch(
    /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDI/,
  );
});
