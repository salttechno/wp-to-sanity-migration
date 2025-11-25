import { htmlToBlocks } from "@sanity/block-tools";
import { JSDOM } from "jsdom";
import { Schema } from "@sanity/schema";

// Define a minimal schema for Portable Text blocks
const defaultSchema = Schema.compile({
  name: "default",
  types: [
    {
      type: "object",
      name: "post",
      fields: [
        {
          title: "Body",
          name: "body",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema
  .get("post")
  .fields.find((field) => field.name === "body").type;

/**
 * Convert HTML string to Portable Text blocks
 * @param {string} html - HTML string to convert
 * @returns {Array} Array of Portable Text blocks
 */
export function convertHtmlToBlocks(html) {
  if (!html || typeof html !== "string") {
    return [];
  }

  // Strip HTML tags and check if there's any actual content
  const textContent = html.replace(/<[^>]*>/g, "").trim();
  if (!textContent) {
    return [];
  }

  try {
    // Create a DOM from the HTML string
    const dom = new JSDOM(html);
    const { body } = dom.window.document;

    // Convert HTML to Portable Text blocks
    const blocks = htmlToBlocks(body.innerHTML, blockContentType, {
      parseHtml: (htmlString) => new JSDOM(htmlString).window.document,
    });

    // Filter out empty blocks
    return blocks.filter((block) => {
      if (block._type === "block") {
        return block.children && block.children.length > 0;
      }
      return true;
    });
  } catch (error) {
    console.error("Error converting HTML to blocks:", error.message);
    // Fallback: create a simple text block
    return [
      {
        _type: "block",
        _key: "fallback",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "span",
            text:
              textContent.substring(0, 500) +
              (textContent.length > 500 ? "..." : ""),
            marks: [],
          },
        ],
      },
    ];
  }
}

/**
 * Convert HTML to simplified blocks (for excerpt)
 * @param {string} html - HTML string to convert
 * @returns {Array} Array of simplified Portable Text blocks
 */
export function convertExcerptToBlocks(html) {
  const blocks = convertHtmlToBlocks(html);

  // Simplify: only keep paragraph blocks, no images
  return blocks
    .filter((block) => block._type === "block")
    .map((block) => ({
      ...block,
      style: "normal", // Force all to normal paragraphs
    }));
}
