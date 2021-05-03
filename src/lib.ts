import plantUMLEncoder = require("plantuml-encoder")
import flatmap = require("unist-util-flatmap")
import { Node } from "unist"

export default function nodeOperator(node: Node, fn: (encoded: string) => string, codeBlockName: string = "plantuml") {
  return flatmap(node, (node) => {
    return node.type === "code" && node.lang === codeBlockName
      ? [{
        type: "paragraph",
        children: [{
          type: "image",
          title: null,
          url: fn(plantUMLEncoder.encode(node.value as string)),
          alt: "PlantUML",
          position: node.position
        }]
      }]
      // do nothing
      : [node]
  })
}
