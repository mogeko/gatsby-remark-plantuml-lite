// @ts-nocheck
import { Image, Paragraph, Root } from 'mdast';
import remark = require('remark');
import nodeOperator from '../src/lib';

let rawAst: Root;

beforeAll(() => {
  rawAst = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `);
});

describe('基础测试', () => {
  let resAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    resAst = nodeOperator(rawAst, (encoded) => {
      return `https://www.plantuml.com/plantuml/svg/${encoded}`;
    });
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
    expect(image.alt).toEqual('PlantUML');
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

test('测试能否正确编码', () => {
  nodeOperator(rawAst, (encoded) => {
    expect(encoded).toStrictEqual(
      'SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80'
    );
    return encoded;
  });
});
