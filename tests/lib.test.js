const fs = require("fs")
const remark = require("remark")
const nodeOperator = require("../dist/lib")

test("基础测试", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const example = JSON.parse(fs.readFileSync("./tests/examples/test.data.0.json"))
  const result = JSON.parse(JSON.stringify(nodeOperator.default(raw, (encoded) => {
    return `https://www.plantuml.com/plantuml/svg/${encoded}`
  })))
  expect(result).toStrictEqual(example)
})

test("测试编码是否正确", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const url = nodeOperator.default(raw, (encoded) => {
    expect(encoded).toStrictEqual("SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80")
    return encoded
  }).children[0].children[0].url
  expect(url).toStrictEqual("SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80")
})

test("更复杂的案例", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`

  ![TEST](http://example.com)

  \`\`\`javascript
  console.log("TEST")
  \`\`\`
  `)
  const example = JSON.parse(fs.readFileSync("./tests/examples/test.data.1.json"))
  const result = JSON.parse(JSON.stringify(nodeOperator.default(raw, (encoded) => {
    return `https://www.plantuml.com/plantuml/svg/${encoded}`
  })))
  expect(result).toStrictEqual(example)
})

test("Markdown 的嵌套", () => {
  const raw = remark().parse(`
  > \`\`\`plantuml
  > @startuml
  > A -> B: Hello / 你好'
  > @enduml
  > \`\`\`
  `)
  const example = JSON.parse(fs.readFileSync("./tests/examples/test.data.2.json"))
  const result = JSON.parse(JSON.stringify(nodeOperator.default(raw, (encoded) => {
    return `https://www.plantuml.com/plantuml/svg/${encoded}`
  })))
  expect(result).toStrictEqual(example)
})
