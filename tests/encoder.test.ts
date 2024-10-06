import { encode, encode64 } from "@/encoder";
import { expect, it } from "vitest";

it("encode64", () => {
  expect(encode64(Uint8Array.of(75, 76, 74, 6, 0))).toStrictEqual(
    Uint8Array.of(73, 113, 110, 65, 49, 87, 48, 48),
  );
});

it("encoder", () => {
  expect(encode(`@startuml\nA -> B: Hello / 你好'\n@enduml`)).toStrictEqual(
    "SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80",
  );
});
