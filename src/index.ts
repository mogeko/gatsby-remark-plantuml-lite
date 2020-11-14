import nodeOperator from "./lib"
import { Node } from "unist"

interface ParsedTypes {
  markdownAST: Node,
}

interface OptionTypes {
  imageType?: "svg" | "png",
}

export default function remarkPlantUML({ markdownAST }: ParsedTypes, pluginOptions?: OptionTypes) {
  const imageType = pluginOptions?.imageType
    ? pluginOptions.imageType
    : "svg"
  return nodeOperator(markdownAST, (encoded) => {
    return `https://www.plantuml.com/plantuml/${imageType}/${encoded}`
  })
}

module.exports = remarkPlantUML
