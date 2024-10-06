import { deflateRaw } from "pako";

function encode6bit(b: number) {
  if (b < 10) return 48 + b; // 0-9
  if (b < 36) return 55 + b; // A-Z
  if (b < 62) return 61 + b; // a-z
  if (b === 62) return 45; // -
  if (b === 63) return 95; // _
  return -1;
}

function* encode3bytes(b1: number, b2: number, b3: number) {
  yield encode6bit((b1 >> 2) & 0x3f);
  yield encode6bit((((b1 & 0x3) << 4) | (b2 >> 4)) & 0x3f);
  yield encode6bit((((b2 & 0xf) << 2) | (b3 >> 6)) & 0x3f);
  yield encode6bit(b3 & 0x3f);
}

export function encode64(charCodeArray: Uint8Array): Uint8Array {
  return Uint8Array.from(
    (function* (arr) {
      for (let i = 0; i < arr.length; i += 3) {
        if (i + 2 === arr.length) {
          // @ts-ignore: It can never get `undefined`
          yield* encode3bytes(arr[i], arr[i + 1], 0);
        } else if (i + 1 === arr.length) {
          // @ts-ignore: It can never get `undefined`
          yield* encode3bytes(arr[i], 0, 0);
        } else {
          // @ts-ignore: It can never get `undefined`
          yield* encode3bytes(arr[i], arr[i + 1], arr[i + 2]);
        }
      }
    })(charCodeArray),
  );
}

export function encode(puml: string): string {
  return new TextDecoder("utf-8").decode(
    encode64(deflateRaw(puml, { level: 9 })),
  );
}

if (import.meta.vitest) {
  const { expect, it } = await import("vitest");

  it("encode6bit", () => {
    expect(
      [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
        56, 57, 58, 59, 60, 61, 62, 63,
      ].map(encode6bit),
    ).toStrictEqual([
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72,
      73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
      97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
      112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 45, 95,
    ]);
    expect(encode6bit(64)).toStrictEqual(-1);
  });

  it("encode3bytes", () => {
    expect([...encode3bytes(1, 2, 3)]).toStrictEqual([48, 71, 56, 51]);
    expect([...encode3bytes(1, 2, 0)]).toStrictEqual([48, 71, 56, 48]);
    expect([...encode3bytes(1, 0, 0)]).toStrictEqual([48, 71, 48, 48]);
  });
}
