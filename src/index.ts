import { encode } from "@/encoder";
import type { Root } from "mdast";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

export default function remarkPlantUML(
  { markdownAST }: { markdownAST: Root },
  pluginOptions?: {
    imageType?: "svg" | "png"; // Type of PlantUML image returned from Web Server
    server?: string; // PlantUML server to generate UML diagrams on-the-fly
    codeBlockLang?: string; // Name of the codeblock languange
    title?: string; // Specifies the title property of the generated PlantUML image
    alt?: string; // Specifies the alt property of the generated PlantUML image
  },
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
      parents.children[index ?? 0] = u("paragraph", {}, [
        u("image", {
          url: `${server}/${imageType}/${encode(node.value)}`,
          title: pluginOptions?.title,
          alt: pluginOptions?.alt ?? codeBlockLang,
        }),
      ]);
    }
  });

  return markdownAST;
}
