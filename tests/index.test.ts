import remarkPlantUML from "@/index";
import type { Image, Paragraph, Root } from "mdast";
import { fromMarkdown } from "mdast-util-from-markdown";
import { beforeAll, describe, expect, it } from "vitest";

describe("基础测试", () => {
  let resAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    resAst = remarkPlantUML({
      markdownAST: fromMarkdown(
        `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
      ),
    });
    paragraph = resAst.children[0] as Paragraph;
    image = paragraph.children[0] as Image;
  });

  it("测试 Wrap (Paragraph) 的类型", () => {
    expect(paragraph.type).toEqual("paragraph");
  });

  it("测试 Image 的类型", () => {
    expect(image.type).toEqual("image");
  });

  it("测试 Image 的 Alt", () => {
    expect(image.alt).toEqual("plantuml");
  });

  it("测试 Image 的 Title", () => {
    expect(image.title).toBeUndefined();
  });

  it("测试 Image 的 Url", () => {
    expect(image.url).toMatch(/https:\/\/www\.plantuml\.com/);
    expect(image.url).toMatch(/svg/);
    expect(image.url).toMatch(
      /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80/,
    );
  });
});

describe("测试配置选项", () => {
  let mdAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    mdAst = remarkPlantUML(
      {
        markdownAST: fromMarkdown(
          `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
        ),
      },
      { imageType: "png", server: "https://example.com" },
    );
    paragraph = mdAst.children[0] as Paragraph;
    image = paragraph.children[0] as Image;
  });

  it("测试选项 imageType", () => {
    expect(image.url).toMatch(/png/);
  });

  it("测试选项 server", () => {
    expect(image.url).toMatch(/https:\/\/example.com/);
  });
});

it("测试自动格式化 url", () => {
  const rawAst = fromMarkdown(
    `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
  );
  const mdAst = remarkPlantUML(
    { markdownAST: rawAst },
    { server: "https://example.com/" }, // will delete the end '/'
  );
  const paragraph = mdAst.children[0] as Paragraph;
  const image = paragraph.children[0] as Image;
  expect(image.url).toMatch(/https:\/\/example.com/);
});

it("测试自定义 codeBlockLang", () => {
  const rawAst = fromMarkdown(
    `\`\`\`uml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
  );
  const mdAst: Root = remarkPlantUML(
    { markdownAST: rawAst },
    { codeBlockLang: "uml" },
  );
  const paragraph = mdAst.children[0] as Paragraph;
  const image = paragraph.children[0] as Image;
  expect(image.url).toMatch(
    /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80/,
  );
});
