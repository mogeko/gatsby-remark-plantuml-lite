import plantUMLEncoder = require('plantuml-encoder');
import flatmap = require('unist-util-flatmap');
import { Code, Paragraph } from 'mdast';

type Fn<T> = (encoded: T) => T;

export type NodeOpt = {
  title?: string | null;
  alt?: string | null;
};

const nodeOperator = (
  node: Code,
  fn: Fn<string>,
  codeBlockName: string = 'plantuml',
  opt: NodeOpt = { title: null, alt: codeBlockName }
) => {
  return flatmap<Code, Paragraph>(node, (node) => {
    return node.type === 'code' && node.lang === codeBlockName
      ? [
          {
            type: 'paragraph',
            children: [
              {
                type: 'image',
                title: opt.title ? opt.title : null,
                url: fn(plantUMLEncoder.encode(node.value as string)),
                alt: opt.alt ? opt.alt : codeBlockName,
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
