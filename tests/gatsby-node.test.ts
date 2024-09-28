import { testPluginOptionsSchema } from "gatsby-plugin-utils";
import { expect, it } from "vitest";
import { pluginOptionsSchema } from "../gatsby-node";

it("基础测试", async () => {
  const options = {
    imageType: "svg",
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options,
  );
  expect(isValid).toBe(true);
  expect(errors).toEqual([]);
});

it("设置返回的图片类型为 PNG", async () => {
  const options = {
    imageType: "png",
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options,
  );
  expect(isValid).toBe(true);
  expect(errors).toEqual([]);
});

it("测试默认情况", async () => {
  const options = {
    imageType: undefined,
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options,
  );
  expect(isValid).toBe(true);
  expect(errors).toEqual([]);
});

it("测试类型错误的情况", async () => {
  const options = {
    imageType: true, // must be a string
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options,
  );
  expect(isValid).toBe(false);
  expect(errors).toEqual([`"imageType" must be a string`]);
});

it("测试选项不存在的情况", async () => {
  const options = {
    err: "svg", // this option does not exist
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options,
  );
  expect(isValid).toBe(true);
  expect(errors).toEqual([]);
});
