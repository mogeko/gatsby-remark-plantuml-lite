declare module 'unist-util-flatmap' {
  import { Root } from 'mdast';

  declare namespace flatMap {
    type Fn<T, U> = (
      node: T,
      index: number | null,
      parent: T | null
    ) => Array<T | U>;
  }

  declare function flatMap<T extends object, U extends object>(
    ast: T | Root,
    fn: flatMap.Fn<T, U>
  ): Root;

  export = flatMap;
}
