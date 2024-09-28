import type { Code, Root, RootContent } from "mdast";
import plantUMLEncoder from "plantuml-encoder";
import flatmap from "unist-util-flatmap";

export const nodeOperator = (
  tree: Root,
  fn: (encoded: string) => string,
  codeBlockName = "plantuml",
  opt: NodeOpt = { title: null, alt: codeBlockName },
): Root => {
  return flatmap<Code>(tree, (node: Code): RootContent[] => {
    return node.type === "code" && node.lang === codeBlockName
      ? [
          {
            type: "paragraph",
            children: [
              {
                type: "image",
                title: opt.title ?? null,
                url: fn(plantUMLEncoder.encode(node.value as string)),
                alt: opt.alt ?? codeBlockName,
                position: node.position,
              },
            ],
            position: node.position,
          },
        ]
      : // do nothing
        [node];
  });
};

export type NodeOpt = {
  title?: string | null;
  alt?: string | null;
};
