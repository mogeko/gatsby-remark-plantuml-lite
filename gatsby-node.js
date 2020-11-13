exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    imageType: Joi.string()
      .default("svg")
      .description("Type of PlantUML image returned from Web Server"),
  })
}