import nodeOperator from "./lib"
import { Node } from "unist"

type ParsedTypes = {
  markdownAST: Node,
}

module.exports = ({ markdownAST }: ParsedTypes, pluginOptions: unknown) => {
  return nodeOperator(markdownAST, (encoded) => {
    return `http://www.plantuml.com/plantuml/svg/${encoded}`
  })
}
