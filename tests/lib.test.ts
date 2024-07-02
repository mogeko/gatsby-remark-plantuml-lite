import { describe, beforeAll, it, expect } from "vitest";
import { fromMarkdown } from "mdast-util-from-markdown";
import { nodeOperator } from "@/lib";
import type { Root, Paragraph, Image } from "mdast";

describe("基础测试", () => {
  let resAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    resAst = nodeOperator(
      fromMarkdown(
        `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
      ),
      (encoded) => {
        return `https://www.plantuml.com/plantuml/svg/${encoded}`;
      },
    );
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
    expect(image.title).toEqual(null);
  });

  it("测试 Image 的 Url", () => {
    expect(image.url).toMatch(/https:\/\/www\.plantuml\.com/);
    expect(image.url).toMatch(/svg/);
    expect(image.url).toMatch(
      /SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIIdDp0000/,
    );
  });
});

describe("测试选项", () => {
  let resAst: Root;
  let paragraph: Paragraph;
  let image: Image;

  beforeAll(() => {
    resAst = nodeOperator(
      fromMarkdown(
        `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
      ),
      (encoded) => {
        return `https://www.plantuml.com/plantuml/svg/${encoded}`;
      },
      "plantuml",
      { title: "exampleTitle", alt: "exampleAlt" },
    );
    paragraph = resAst.children[0] as Paragraph;
    image = paragraph.children[0] as Image;
  });

  it("测试选项 title", () => {
    expect(image.title).not.toBeNull;
    expect(image.title).toEqual("exampleTitle");
  });

  it("测试选项 alt", () => {
    expect(image.alt).not.toEqual("plantuml");
    expect(image.alt).toEqual("exampleAlt");
  });
});

it("测试自定义 codeBlockName", () => {
  const resAst: Root = nodeOperator(
    fromMarkdown(
      `\`\`\`uml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
    ),
    (encoded) => {
      return `https://www.plantuml.com/plantuml/svg/${encoded}`;
    },
    "uml",
  );
  const paragraph = resAst.children[0] as Paragraph;
  const image = paragraph.children[0] as Image;
  expect(image.alt).toEqual("uml");
});

it("测试能否正确编码", () => {
  nodeOperator(
    fromMarkdown(
      `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
    ),
    (encoded) => {
      expect(encoded).toStrictEqual(
        "SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIIdDp0000",
      );
      return encoded;
    },
  );
});

it("测试选项 only an title", () => {
  const resAst: Root = nodeOperator(
    fromMarkdown(
      `\`\`\`plantuml\n@startuml\nA -> B: Hello / 你好'\n@enduml\n\`\`\``,
    ),
    (encoded) => {
      return `https://www.plantuml.com/plantuml/svg/${encoded}`;
    },
    "plantuml",
    { title: "exampleTitle" },
  );
  const paragraph = resAst.children[0] as Paragraph;
  const image = paragraph.children[0] as Image;
  expect(image.title).not.toBeNull();
  expect(image.alt).not.toBeUndefined();
  expect(image.title).toEqual("exampleTitle");
  expect(image.alt).toEqual("plantuml");
});
