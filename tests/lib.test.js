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
    return `http://www.plantuml.com/plantuml/svg/${encoded}`
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
