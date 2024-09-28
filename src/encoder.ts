import { promisify } from "node:util";
import { type InputType, deflateRaw } from "node:zlib";

export async function deflate(buff: InputType) {
  return (await promisify(deflateRaw)(buff, { level: 9 })).toString("binary");
}

function encode6bit(code: number) {
  if (code < 10) return String.fromCharCode(48 + code); // 0-9
  if (code < 36) return String.fromCharCode(55 + code); // A-Z
  if (code < 62) return String.fromCharCode(61 + code); // a-z
  if (code === 62) return "-";
  if (code === 63) return "_";
  return "?";
}

function append3bytes(b1: number, b2: number, b3: number) {
  return (
    encode6bit((b1 >> 2) & 0x3f) +
    encode6bit(((b1 & 0x3) << 4) | ((b2 >> 4) & 0x3f)) +
    encode6bit(((b2 & 0xf) << 2) | ((b3 >> 6) & 0x3f)) +
    encode6bit(b3 & 0x3f)
  );
}

export function encode64(data: string) {
  let r = "";
  for (let i = 0; i < data.length; i += 3) {
    if (i + 2 === data.length) {
      r += append3bytes(data.charCodeAt(i), data.charCodeAt(i + 1), 0);
    } else if (i + 1 === data.length) {
      r += append3bytes(data.charCodeAt(i), 0, 0);
    } else {
      r += append3bytes(
        data.charCodeAt(i),
        data.charCodeAt(i + 1),
        data.charCodeAt(i + 2),
      );
    }
  }
  return r;
}

export async function encoder(puml: string) {
  return encode64(await deflate(puml));
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
      ]
        .map(encode6bit)
        .join(""),
    ).toStrictEqual(
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_",
    );
    expect(encode6bit(64)).toStrictEqual("?");
  });

  it("append3bytes", () => {
    expect(append3bytes(1, 2, 3)).toStrictEqual("0G83");
    expect(append3bytes(1, 2, 0)).toStrictEqual("0G80");
    expect(append3bytes(1, 0, 0)).toStrictEqual("0G00");
  });
}
