import plantUMLEncoder = require('plantuml-encoder');
import flatmap = require('unist-util-flatmap');
import { Code, Content, Root } from 'mdast';

export type NodeOpt = {
  title?: string | null;
  alt?: string | null;
};

const nodeOperator = (
  tree: Root,
  fn: (encoded: string) => string,
  codeBlockName: string = 'plantuml',
  opt: NodeOpt = { title: null, alt: codeBlockName }
): Root => {
  return flatmap<Code>(tree, (node: Code): Content[] => {
    return node.type === 'code' && node.lang === codeBlockName
      ? [
          {
            type: 'paragraph',
            children: [
              {
                type: 'image',
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

export default nodeOperator;
