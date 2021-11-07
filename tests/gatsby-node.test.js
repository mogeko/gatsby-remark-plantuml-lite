const { testPluginOptionsSchema } = require('gatsby-plugin-utils');
const { pluginOptionsSchema } = require('../gatsby-node');

test('基础测试', async () => {
  const options = {
    imageType: 'svg',
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options
  );
  expect(isValid).toBe(true);
  expect(errors).toEqual([]);
});

test('设置返回的图片类型为 PNG', async () => {
  const options = {
    imageType: 'png',
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options
  );
  expect(isValid).toBe(true);
  expect(errors).toEqual([]);
});

test('测试默认情况', async () => {
  const options = {
    imageType: undefined,
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options
  );
  expect(isValid).toBe(true);
  expect(errors).toEqual([]);
});

test('测试类型错误的情况', async () => {
  const options = {
    imageType: true, // must be a string
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options
  );
  expect(isValid).toBe(false);
  expect(errors).toEqual([`"imageType" must be a string`]);
});

test('测试选项不存在的情况', async () => {
  const options = {
    err: 'svg', // is not allowed
  };
  const { isValid, errors } = await testPluginOptionsSchema(
    pluginOptionsSchema,
    options
  );
  expect(isValid).toBe(false);
  expect(errors).toEqual([`"err" is not allowed`]);
});
