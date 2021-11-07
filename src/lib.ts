import plantUMLEncoder = require("plantuml-encoder");
import flatmap = require("unist-util-flatmap");
import { Code, Paragraph } from "mdast";

type Fn<T> = (encoded: T) => T;

const nodeOperator = (
  node: Code,
  fn: Fn<string>,
  codeBlockName: string = "plantuml"
) => {
  return flatmap<Code, Paragraph>(node, (node) => {
    return node.type === "code" && node.lang === codeBlockName
      ? [
          {
            type: "paragraph",
            children: [
              {
                type: "image",
                title: null,
                url: fn(plantUMLEncoder.encode(node.value as string)),
                alt: "PlantUML",
                position: node.position,
              },
            ],
          },
        ]
      : // do nothing
        [node];
  });
};

export default nodeOperator;
