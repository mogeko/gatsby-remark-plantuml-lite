declare module "unist-util-flatmap" {
  import { Node } from "unist"

  declare namespace flatMap {
    type Fn = (
      node: Node,
      index: number | null,
      parent: Node | null,
    ) => Array<Node>
  }

  declare function flatMap(
    ast: Node,
    fn: flatMap.Fn,
  ): Node

  export = flatMap
}