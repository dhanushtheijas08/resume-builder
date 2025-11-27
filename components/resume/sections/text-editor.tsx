"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolBar } from "./editor-tool-bar";

export const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    immediatelyRender: true,
    editorProps: {
      attributes: {
        class:
          "focus:outline-none border border-t-0 border-input rounded-b-md p-2 min-h-[100px]",
      },
    },
    shouldRerenderOnTransaction: true,
  });
  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md bg-background">
      <EditorToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
