exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    codeBlockLang: Joi.string()
      .default("plantuml")
      .description("Name of the codeblock languange."),
    imageType: Joi.string()
      .default("svg")
      .description("Type of PlantUML image returned from Web Server."),
    server: Joi.string()
      .default("https://www.plantuml.com/plantuml")
      .description("PlantUML server to generate UML diagrams on-the-fly."),
    title: Joi.string()
      .default(null)
      .description(
        "Specifies the title property of the generated PlantUML image."
      ),
    alt: Joi.string()
      .default("plantuml")
      .description(
        "Specifies the alt property of the generated PlantUML image."
      ),
  });
};
