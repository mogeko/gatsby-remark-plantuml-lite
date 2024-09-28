import { promisify } from "node:util";
import { type InputType, deflateRaw, deflateRawSync } from "node:zlib";

export async function deflate(buff: InputType) {
  return (await promisify(deflateRaw)(buff, { level: 9 })).toString("binary");
}

export function deflateSync(buff: InputType) {
  return deflateRawSync(buff, { level: 9 }).toString("binary");
}
