import type { Blockquote, Root } from "mdast";

/** Remove the Obsidian NOTE marker while preserving the quote content. */
export function remarkNote() {
  return (tree: Root) => {
    for (const node of tree.children) {
      if (node.type !== "blockquote") continue;
      stripNoteMarker(node);
    }
  };
}

function stripNoteMarker(node: Blockquote) {
  const paragraph = node.children[0];
  if (paragraph?.type !== "paragraph") return;
  const marker = paragraph.children[0];
  if (marker?.type !== "text" || !/^\[!NOTE\](?:\r?\n|$)/.test(marker.value))
    return;

  marker.value = marker.value.replace(/^\[!NOTE\](?:\r?\n|$)/, "");
  if (!marker.value) paragraph.children.shift();
  if (!paragraph.children.length) node.children.shift();
}
