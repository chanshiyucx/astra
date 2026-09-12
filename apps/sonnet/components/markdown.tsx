import Markdown from "react-markdown";
import { remarkNote } from "../lib/remark-note";

export function NoteMarkdown({ content }: { content: string }) {
  return (
    <div className="markdown">
      <Markdown skipHtml remarkPlugins={[remarkNote]}>
        {content}
      </Markdown>
    </div>
  );
}
