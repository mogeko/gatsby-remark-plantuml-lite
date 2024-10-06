import { encode, encode64 } from "@/encoder";
import { expect, it } from "vitest";

it("encode64", () => {
  expect(encode64(Uint8Array.of(1, 2, 3))).toStrictEqual(
    Uint8Array.of(48, 71, 56, 51),
  );
  expect(encode64(Uint8Array.of(1, 2))).toStrictEqual(
    Uint8Array.of(48, 71, 56, 48),
  );
  expect(encode64(Uint8Array.of(1))).toStrictEqual(
    Uint8Array.of(48, 71, 48, 48),
  );
});

it("encoder", () => {
  expect(encode(`@startuml\nA -> B: Hello / 你好'\n@enduml`)).toStrictEqual(
    "SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80",
  );
});
