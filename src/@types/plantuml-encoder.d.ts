declare module "plantuml-encoder" {
  export = {
    encode,
    decode,
  };
  declare function encode(puml: string): string;
  declare function decode(encoded: string): string;
}
