declare module "unist-util-flatmap" {

  declare namespace flatMap {
    type Fn<T, U> =(
      node: T,
      index: number | null,
      parent: T | null
    ) => Array<T | U>
  }

  declare function flatMap<T extends object, U extends object> (
    ast: T,
    fn: flatMap.Fn<T, U>,
  ): U

  export = flatMap
}
