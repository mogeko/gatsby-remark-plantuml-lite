declare module "unist-util-flatmap" {
  import { Content, Parent, Root } from "mdast";
  declare namespace flatMap {
    type Fn<T extends Content> = (
      node: T,
      index: number,
      parent: Parent | null,
    ) => Content[];
  }
  declare function flatMap<T extends Content>(
    ast: Root,
    fn: flatMap.Fn<T>,
  ): Root;
  export = flatMap;
}
