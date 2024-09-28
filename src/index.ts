import type { Root, Paragraph } from "mdast";
import plantUMLEncoder from "plantuml-encoder";
import { visit } from "unist-util-visit";
import { paragraph, image } from "mdast-builder";

export default function remarkPlantUML(
  { markdownAST }: ParsedTypes,
  pluginOptions?: OptionTypes,
): Root {
  const imageType = pluginOptions?.imageType ?? "svg";
  const server = pluginOptions?.server
    ? pluginOptions.server.charAt(pluginOptions.server.length - 1) === "/"
      ? pluginOptions.server.substring(0, pluginOptions.server.length - 1)
      : pluginOptions.server
    : "https://www.plantuml.com/plantuml";
  const codeBlockLang = pluginOptions?.codeBlockLang ?? "plantuml";

  visit(markdownAST, "code", (node, index, parents) => {
    if (node.lang === codeBlockLang && parents) {
      markdownAST.children[index ?? 0] = paragraph(
        image(
          `${server}/${imageType}/${plantUMLEncoder.encode(node.value)}`,
          pluginOptions?.title,
          pluginOptions?.alt ?? codeBlockLang,
        ),
      ) as Paragraph;
    }
  });

  return markdownAST;
}

type ParsedTypes = {
  markdownAST: Root;
};

type OptionTypes = {
  imageType?: "svg" | "png";
  server?: string;
  codeBlockLang?: string;
  title?: string;
  alt?: string;
};
