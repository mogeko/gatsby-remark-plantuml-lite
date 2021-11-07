import nodeOperator from './lib';
import { Code, Paragraph } from 'mdast';

interface ParsedTypes {
  markdownAST: Code;
}

interface OptionTypes {
  imageType?: 'svg' | 'png';
  server?: string;
  codeBlockLang?: string;
}

export default function remarkPlantUML(
  { markdownAST }: ParsedTypes,
  pluginOptions?: OptionTypes
): Paragraph {
  const imageType = pluginOptions?.imageType ? pluginOptions.imageType : 'svg';
  const server = pluginOptions?.server
    ? pluginOptions.server.charAt(pluginOptions.server.length - 1) == '/'
      ? pluginOptions.server.substr(0, pluginOptions.server.length - 1)
      : pluginOptions.server
    : 'https://www.plantuml.com/plantuml';
  const codeBlockLang = pluginOptions?.codeBlockLang
    ? pluginOptions.codeBlockLang
    : 'plantuml';
  return nodeOperator(
    markdownAST,
    (encoded) => {
      return `${server}/${imageType}/${encoded}`;
    },
    codeBlockLang
  );
}

module.exports = remarkPlantUML;
