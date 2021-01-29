import nodeOperator from "./lib"
import { Node } from "unist"

interface ParsedTypes {
  markdownAST: Node,
}

interface OptionTypes {
  imageType?: "svg" | "png",
  server?: string,
}

export default function remarkPlantUML({ markdownAST }: ParsedTypes, pluginOptions?: OptionTypes) {
  const imageType = pluginOptions?.imageType
    ? pluginOptions.imageType
    : "svg"
  const server = pluginOptions?.server
    ? pluginOptions.server
    : "https://www.plantuml.com/plantuml"
  return nodeOperator(markdownAST, (encoded) => {
    return `${server}/${imageType}/${encoded}`
  })
}

module.exports = remarkPlantUML
