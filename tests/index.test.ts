import remark = require("remark")
import remarkPlantUML from "../src/index"

test("基础测试", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const example = require("./examples/test.data.0.json")
  const result = remarkPlantUML({ markdownAST: raw }, { imageType: "svg" })
  expect(result).toStrictEqual(example)
})

test("测试配置选项 (imageType)", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const example = require("./examples/test.data.3.json")
  const result = remarkPlantUML({ markdownAST: raw }, { imageType: "png" })
  expect(result).toStrictEqual(example)
})

test("测试配置选项 (server)", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const example = require("./examples/test.data.4.json")
  const result = remarkPlantUML({ markdownAST: raw }, { server: "https://example.com" })
  expect(result).toStrictEqual(example)
})

test("测试默认配置选项", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const example = require("./examples/test.data.0.json")
  const result = remarkPlantUML({ markdownAST: raw })
  expect(result).toStrictEqual(example)
})
