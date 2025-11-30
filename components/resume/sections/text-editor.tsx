"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolBar } from "./editor-tool-bar";

export const TextEditor = ({
  isLoading,
  value,
  onChange,
}: {
  isLoading: boolean;
  value: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: true,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: isLoading
          ? "focus:outline-none border border-t-0 border-input rounded-b-md p-2 max-w-[40rem] min-h-[120px] max-h-[200px] overflow-auto custom-scrollbar opacity-50 bg-muted text-muted-foreground cursor-not-allowed pointer-events-none"
          : "focus:outline-none border border-t-0 border-input rounded-b-md p-2 max-w-[40rem] min-h-[120px] max-h-[200px] overflow-auto custom-scrollbar",
      },
    },
    editable: !isLoading,
    shouldRerenderOnTransaction: true,
  });
  if (!editor) {
    return null;
  }

  console.log({ isLoading });

  return (
    <div className="border rounded-md bg-background rich-text">
      <EditorToolBar editor={editor} isLoading={isLoading} />
      <EditorContent editor={editor} />
    </div>
  );
};
