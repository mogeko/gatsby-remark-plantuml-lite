const { testPluginOptionsSchema } = require("gatsby-plugin-utils")
const { pluginOptionsSchema } = require("../gatsby-node")

test("基础测试", async () => {
  const options = {
    imageType: "svg"
  }

  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options
  )

  expect(isValid).toBe(true)
  expect(errors).toEqual([])
})
