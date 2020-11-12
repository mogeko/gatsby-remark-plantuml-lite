import plantEncoder = require("plantuml-encoder")
import flatmap = require("unist-util-flatmap")
import { Node } from "unist"

type ParsedTypes = {
  markdownAST: Node,
}

module.exports = ({ markdownAST }: ParsedTypes, pluginOptions: unknown) => {
  markdownAST = flatmap(markdownAST, (node) => {
    if (node.type === "code") {
      const encoded = plantEncoder.encode(node.value as string)
      const position = node.position
      return node.lang === "plantuml"
        ? [{
          type: "paragraph",
          children: [{
            type: "image",
            title: null,
            url: `http://www.plantuml.com/plantuml/svg/${encoded}`,
            alt: "PlantUML",
            position: position
          }],
        }]
        : [node]
    }
    // do nothing
    return [node]
  })
  return markdownAST
}
