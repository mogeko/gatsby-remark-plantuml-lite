// @ts-nocheck
import { Image, Paragraph, Root } from 'mdast';
import remark = require('remark');
import nodeOperator from '../src/lib';

describe('基础测试', () => {
  let resAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    resAst = nodeOperator(
      remark().parse(
        `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``
      ),
      (encoded) => {
        return `https://www.plantuml.com/plantuml/svg/${encoded}`;
      }
    );
    paragraph = resAst.children[0];
    image = paragraph.children[0];
  });

  test('测试 Wrap (Paragraph) 的类型', () => {
    expect(paragraph.type).toEqual('paragraph');
  });

  test('测试 Image 的类型', () => {
    expect(image.type).toEqual('image');
  });

  test('测试 Image 的 Alt', () => {
    expect(image.alt).toEqual('plantuml');
  });

  test('测试 Image 的 Title', () => {
    expect(image.title).toEqual(null);
  });

  test('测试 Image 的 Url', () => {
    expect(image.url).toMatch(/https:\/\/www.plantuml.com/);
    expect(image.url).toMatch(/svg/);
    expect(image.url).toMatch(
      /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80/
    );
  });
});

describe('测试选项', () => {
  let resAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    resAst = nodeOperator(
      remark().parse(
        `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``
      ),
      (encoded) => {
        return `https://www.plantuml.com/plantuml/svg/${encoded}`;
      },
      'plantuml',
      { title: 'exampleTitle', alt: 'exampleAlt' }
    );
    paragraph = resAst.children[0];
    image = paragraph.children[0];
  });

  test('测试选项 title', () => {
    expect(image.title).not.toBeNull;
    expect(image.title).toEqual('exampleTitle');
  });

  test('测试选项 alt', () => {
    expect(image.alt).not.toEqual('plantuml');
    expect(image.alt).toEqual('exampleAlt');
  });
});

test('测试自定义 codeBlockName', () => {
  const resAst: Root = nodeOperator(
    remark().parse(
      `\`\`\`uml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``
    ),
    (encoded) => {
      return `https://www.plantuml.com/plantuml/svg/${encoded}`;
    },
    'uml'
  );
  const paragraph: Paragraph = resAst.children[0];
  const image: Image = paragraph.children[0];
  expect(image.alt).toEqual('uml');
});

test('测试能否正确编码', () => {
  nodeOperator(
    remark().parse(
      `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``
    ),
    (encoded) => {
      expect(encoded).toStrictEqual(
        'SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80'
      );
      return encoded;
    }
  );
});

test('测试选项 only an title', () => {
  const resAst: Root = nodeOperator(
    remark().parse(
      `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``
    ),
    (encoded) => {
      return `https://www.plantuml.com/plantuml/svg/${encoded}`;
    },
    'plantuml',
    { title: 'exampleTitle' }
  );
  const paragraph: Paragraph = resAst.children[0];
  const image: Image = paragraph.children[0];
  expect(image.title).not.toBeNull();
  expect(image.alt).not.toBeUndefined();
  expect(image.title).toEqual('exampleTitle');
  expect(image.alt).toEqual('plantuml');
});
