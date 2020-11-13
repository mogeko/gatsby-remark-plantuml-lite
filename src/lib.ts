import plantumlEncoder = require("plantuml-encoder")
import flatmap = require("unist-util-flatmap")
import { Node } from "unist"

export default function nodeOperator(node: Node, fn: (encoded: string) => string) {
  const encoder = (value: string, fn: (encoded: string) => string) => {
    return fn(plantumlEncoder.encode(value))
  }
  return flatmap(node, (node) => {
    if (node.type === "code") {
      const position = node.position
      if (node.lang === "plantuml") {
        const imageUrl = encoder(node.value as string, fn)
        return [{
          type: "paragraph",
          children: [{
            type: "image",
            title: null,
            url: imageUrl,
            alt: "PlantUML",
            position: position
          }],
        }]
      }
    }
    // do nothing
    return [node]
  })
}
