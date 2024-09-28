import { Buffer } from "node:buffer";
import { deflate, encode64, encoder } from "@/encoder";
import { expect, it } from "vitest";

it("deflate", async () => {
  expect(await deflate("abc")).toStrictEqual(
    Buffer.from([75, 76, 74, 6, 0]).toString("binary"),
  );
});

it("encode64", () => {
  expect(
    encode64(Buffer.from([75, 76, 74, 6, 0]).toString("binary")),
  ).toStrictEqual("IqnA1W00");
});

it("encoder", async () => {
  expect(await encoder(`@startuml\nA -> B: Hello / 你好'\n@enduml`)).toMatch(
    /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDI/,
  );
});
