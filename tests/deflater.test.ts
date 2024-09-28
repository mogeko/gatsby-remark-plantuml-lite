import { Buffer } from "node:buffer";
import { deflate, deflateSync } from "@/deflater";
import { expect, it } from "vitest";

it("deflate", async () => {
  expect(await deflate("abc")).toStrictEqual(
    Buffer.from([75, 76, 74, 6, 0]).toString("binary"),
  );
});

it("deflateSync", () => {
  expect(deflateSync("abc")).toStrictEqual(
    Buffer.from([75, 76, 74, 6, 0]).toString("binary"),
  );
});
