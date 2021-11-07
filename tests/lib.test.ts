// @ts-nocheck
import remark = require("remark");
import nodeOperator from "../dist/lib";

const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `);

test("基础测试", () => {
  const example = require("./examples/test.data.0.json");
  const result = nodeOperator(raw, (encoded) => {
    return `https://www.plantuml.com/plantuml/svg/${encoded}`;
  });
  expect(result).toStrictEqual(example);
});

test("测试编码是否正确", () => {
  nodeOperator(raw, (encoded) => {
    expect(encoded).toStrictEqual(
      "SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80"
    );
    return encoded;
  });
});
