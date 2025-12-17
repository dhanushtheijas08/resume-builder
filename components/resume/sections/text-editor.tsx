"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolBar } from "./editor-tool-bar";
import { sanitizeClientHtml } from "@/lib/sanitize-html-input";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

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
    extensions: [
      StarterKit.configure({
        code: false,
        codeBlock: false,
        listItem: false,
        orderedList: false,
        bulletList: false,
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "resume-ul",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "resume-ol",
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: "resume-li",
        },
      }),
    ],
    immediatelyRender: true,
    content: value,
    onUpdate: ({ editor }) => {
      onChange(sanitizeClientHtml(editor.getHTML()));
    },
    editorProps: {
      attributes: {
        class: isLoading
          ? "focus:outline-none border border-t-0 border-input rounded-b-md p-2 max-w-[40rem] min-h-[120px] max-h-[200px] overflow-auto custom-scrollbar opacity-50 cursor-not-allowed pointer-events-none"
          : "focus:outline-none border border-t-0 border-input rounded-b-md p-2 max-w-[40rem] min-h-[120px] max-h-[200px] overflow-auto custom-scrollbar",
      },
    },
    editable: !isLoading,
    shouldRerenderOnTransaction: true,
  });
  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-md bg-background rich-text">
      <EditorToolBar editor={editor} isLoading={isLoading} />
      <EditorContent editor={editor} />
    </div>
  );
};
