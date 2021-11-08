// @ts-nocheck
import { Image, Paragraph, Root } from 'mdast';
import remark = require('remark');
import remarkPlantUML from '../src/index';

describe('基础测试', () => {
  let resAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    resAst = remarkPlantUML({
      markdownAST: remark().parse(
        `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``
      ),
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

describe('测试配置选项', () => {
  let mdAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    mdAst = remarkPlantUML(
      {
        markdownAST: remark().parse(
          `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``
        ),
      },
      { imageType: 'png', server: 'https://example.com/' }
    );
    paragraph = mdAst.children[0];
    image = paragraph.children[0];
  });

  test('测试选项 imageType', () => {
    expect(image.url).toMatch(/png/);
  });

  test('测试选项 server', () => {
    expect(image.url).toMatch(/https:\/\/example.com/);
  });
});

test('测试自定义 codeBlockLang', () => {
  const raw = remark().parse(
    `\`\`\`uml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``
  );
  const mdAst: Root = remarkPlantUML(
    { markdownAST: raw },
    { codeBlockLang: 'uml' }
  );
  const paragraph: Paragraph = mdAst.children[0];
  const image: Image = paragraph.children[0];
  expect(image.url).toMatch(
    /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80/
  );
});
