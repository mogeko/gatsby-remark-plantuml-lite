import { type InputType, deflateRawSync } from "node:zlib";

export function deflate(buff: InputType) {
  return deflateRawSync(buff, { level: 9 }).toString("binary");
}

function encode6bit(b: number) {
  if (b < 10) return String.fromCharCode(48 + b); // 0-9
  if (b < 36) return String.fromCharCode(55 + b); // A-Z
  if (b < 62) return String.fromCharCode(61 + b); // a-z
  if (b === 62) return "-";
  if (b === 63) return "_";
  return "?";
}

function encode3bytes(b1: number, b2: number, b3: number) {
  return encode6bit((b1 >> 2) & 0x3f).concat(
    encode6bit(((b1 & 0x3) << 4) | ((b2 >> 4) & 0x3f)),
    encode6bit(((b2 & 0xf) << 2) | ((b3 >> 6) & 0x3f)),
    encode6bit(b3 & 0x3f),
  );
}

function encode(s: string) {
  let r = "";
  for (let i = 0; i < s.length; i += 3) {
    if (i + 2 === s.length) {
      r = r.concat(encode3bytes(s.charCodeAt(i), s.charCodeAt(i + 1), 0));
    } else if (i + 1 === s.length) {
      r = r.concat(encode3bytes(s.charCodeAt(i), 0, 0));
    } else {
      r = r.concat(
        encode3bytes(s.charCodeAt(i), s.charCodeAt(i + 1), s.charCodeAt(i + 2)),
      );
    }
  }
  return r;
}

export function encoder(puml: string) {
  return encode(deflate(puml));
}

if (import.meta.vitest) {
  const { Buffer } = await import("node:buffer");
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
    expect(encode3bytes(1, 2, 3)).toStrictEqual("0G83");
    expect(encode3bytes(1, 2, 0)).toStrictEqual("0G80");
    expect(encode3bytes(1, 0, 0)).toStrictEqual("0G00");
  });

  it("encode64", () => {
    expect(
      encode(Buffer.from([75, 76, 74, 6, 0]).toString("binary")),
    ).toStrictEqual("IqnA1W00");
  });
}
