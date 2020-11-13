const fs = require("fs")
const remark = require("remark")
const remarkPlantUML = require("../dist/index")

test("基础测试", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const example = JSON.parse(fs.readFileSync("./tests/examples/test.data.0.json"))
  const result = JSON.parse(JSON.stringify(remarkPlantUML({ markdownAST: raw })))
  expect(result).toStrictEqual(example)
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
  const result = JSON.parse(JSON.stringify(remarkPlantUML({ markdownAST: raw })))
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
  const result = JSON.parse(JSON.stringify(remarkPlantUML({ markdownAST: raw })))
  expect(result).toStrictEqual(example)
})
