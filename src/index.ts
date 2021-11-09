import nodeOperator, { NodeOpt } from './lib';
import { Root } from 'mdast';

type ParsedTypes = {
  markdownAST: Root;
};

type OptionTypes = {
  imageType?: 'svg' | 'png';
  server?: string;
  codeBlockLang?: string;
} & NodeOpt;

export default function remarkPlantUML(
  { markdownAST }: ParsedTypes,
  pluginOptions?: OptionTypes
): Root {
  const imageType = pluginOptions?.imageType ?? 'svg';
  const server = pluginOptions?.server
    ? pluginOptions.server.charAt(pluginOptions.server.length - 1) == '/'
      ? pluginOptions.server.substr(0, pluginOptions.server.length - 1)
      : pluginOptions.server
    : 'https://www.plantuml.com/plantuml';
  const codeBlockLang = pluginOptions?.codeBlockLang ?? 'plantuml';
  return nodeOperator(
    markdownAST,
    (encoded) => {
      return `${server}/${imageType}/${encoded}`;
    },
    codeBlockLang,
    { title: pluginOptions?.title, alt: pluginOptions?.alt }
  );
}

module.exports = remarkPlantUML;
