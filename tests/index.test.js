const remark = require("remark");
const remarkPlantUML = require("../dist/index")

test("基础测试", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const example = {
    "children": [{
      "children": [{
        "alt": "PlantUML", "position": {
          "end": { "column": 6, "line": 6, "offset": 64 }, "start": {
            "column": 3,
            "line": 2, "offset": 3
          }
        }, "title": null, "type": "image", "url": "http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80"
      }], "type": "paragraph"
    }], "position": { "end": { "column": 3, "line": 7, "offset": 67 }, "start": { "column": 1, "line": 1, "offset": 0 } }, "type": "root"
  }
  expect(remarkPlantUML({ markdownAST: raw })).toStrictEqual(example)
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
  const example = {
    "children": [{
      "children": [{
        "alt": "PlantUML", "position": {
          "end": { "column": 6, "line": 6, "offset": 64 }, "start": {
            "column": 3,
            "line": 2, "offset": 3
          }
        }, "title": null, "type": "image", "url": "http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80"
      }], "type": "paragraph"
    }, { "children": [{ "alt": "TEST", "position": { "end": { "column": 30, "line": 8, "offset": 95 }, "start": { "column": 3, "line": 8, "offset": 68 } }, "title": null, "type": "image", "url": "http://example.com" }], "position": { "end": { "column": 30, "line": 8, "offset": 95 }, "start": { "column": 3, "line": 8, "offset": 68 } }, "type": "paragraph" }, {
      "lang": "javascript", "meta": null, "position": {
        "end":
          { "column": 6, "line": 12, "offset": 140 }, "start": { "column": 3, "line": 10, "offset": 99 }
      }, "type": "code", "value": "console.log(\"TEST\")"
    }],
    "position": { "end": { "column": 3, "line": 13, "offset": 143 }, "start": { "column": 1, "line": 1, "offset": 0 } }, "type": "root"
  }
  expect(remarkPlantUML({ markdownAST: raw })).toStrictEqual(example)
})

test("测试编码是否正确", () => {
  const raw = remark().parse(`
  \`\`\`plantuml
  @startuml
  A -> B: Hello / 你好'
  @enduml
  \`\`\`
  `)
  const url = remarkPlantUML({ markdownAST: raw }).children[0].children[0].url
  expect(url).toMatch(/SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80/)
})

test("Markdown 的嵌套", () => {
  const raw = remark().parse(`
  > \`\`\`plantuml
  > @startuml
  > A -> B: Hello / 你好'
  > @enduml
  > \`\`\`
  `)
  const example = {
    "children": [{
      "children": [{
        "children": [{
          "alt": "PlantUML", "position": {
            "end": { "column": 8, "line": 6, "offset": 74 }, "start":
              { "column": 5, "line": 2, "offset": 5 }
          }, "title": null, "type": "image", "url": "http://www.plantuml.com/plantuml/svg/SoWkIImgAStDuN9KqBLJSB9Iy4ZDoSbNq5TuidV1qwLxrRaSKlDIWF80"
        }], "type": "paragraph"
      }], "position": { "end": { "column": 8, "line": 6, "offset": 74 }, "start": { "column": 3, "line": 2, "offset": 3 } }, "type": "blockquote"
    }], "position": { "end": { "column": 3, "line": 7, "offset": 77 }, "start": { "column": 1, "line": 1, "offset": 0 } }, "type": "root"
  }
  expect(remarkPlantUML({ markdownAST: raw })).toStrictEqual(example)
})